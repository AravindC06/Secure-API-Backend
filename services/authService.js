const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const responseFormatter = require("../utils/responseFormatter");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(path.resolve(__dirname, "../certs/private.pem"), "utf8");
const publicKey = fs.readFileSync(path.resolve(__dirname, "../certs/public.pem"), "utf8");

const authService = {
  login: async ({ password, user }) => {
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw { status: 401, message: "Invalid credentials" };
      return { userName: user.userName, email: user.email, role: user.role };
    } catch (error) {
      throw { status: 500, message: error.message || "Login failed" };
    }
  },

  generateAccessToken: (user) => {
    const payload = { user: { userName: user.userName, role: user.role } };

    const options = {
      algorithm: "RS256",
      expiresIn: "15m",
      audience: "urn:metro:user-api",
      issuer: "urn:metro:auth",
    };

    return jwt.sign(payload, privateKey, options);
  },

  generateRefreshToken: async (user) => {
    const payload = { user: { userName: user.userName, role: user.role } };
    const options = {
      algorithm: "RS256",
      expiresIn: "30d",
      audience: "urn:metro:user-api",
      issuer: "urn:metro:auth",
    };

    try {
      const foundUser = await User.findOne({ email: user.email });
      if (!foundUser) {
        throw { status: 404, message: "User not found." };
      }

      if (foundUser.refreshToken.length > 0) {
        try {
          const decoded = jwt.verify(foundUser.refreshToken[0], publicKey, {
            algorithms: ["RS256"],
            audience: "urn:metro:user-api",
            issuer: "urn:metro:auth",
          });

          const fiveDaysInMilliseconds = 5 * 24 * 60 * 60 * 1000;
          const currentTime = Date.now();
          const tokenExpiryTime = decoded.exp * 1000;

          if (tokenExpiryTime - currentTime <= fiveDaysInMilliseconds) {
            const newRefreshToken = jwt.sign(payload, privateKey, options);
            await User.findByIdAndUpdate(user.id, { $set: { refreshToken: newRefreshToken } }, { new: true });
            return newRefreshToken;
          } else {
            return foundUser.refreshToken[0];
          }
        } catch (decodeError) {
          throw { status: 401, message: "Invalid refresh token. Please log in again." };
        }
      }

      const newRefreshToken = jwt.sign(payload, privateKey, options);
      await User.findByIdAndUpdate(user.id, { $set: { refreshToken: newRefreshToken } }, { new: true });
      console.log("New Refresh Token Created: ", newRefreshToken);

      return newRefreshToken;
    } catch (err) {
      console.error("Error in generateRefreshToken: ", err);
      throw { status: 500, message: err.message || "Failed to process refresh token." };
    }
  },

  verifyAndHandleToken: async (token) => {
    try {
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
        audience: "urn:metro:user-api",
        issuer: "urn:metro:auth",
      });

      const { userName, role } = decoded.user;
      const currentTime = Date.now();
      const tokenExpiryTime = decoded.exp * 1000;
      const oneDayInMilliseconds = 5 * 24 * 60 * 60 * 1000;
      const query = {
        name: userName,
        "roles.User": role,
      };

      const user = await User.findOne(query).exec();

      if (!user) {
        throw { status: 404, message: "User not found or role mismatch." };
      }
      if (!user.refreshToken.includes(token)) {
        throw { status: 401, message: "Token mismatch." };
      }

      const isTokenExpiringSoon = tokenExpiryTime - currentTime <= oneDayInMilliseconds;

      if (isTokenExpiringSoon) {
        console.log("Token is expiring soon. Generating a new refresh token...");

        const newRefreshToken = jwt.sign({ user: { userName, role } }, privateKey, {
          algorithm: "RS256",
          expiresIn: "30d",
          audience: "urn:metro:user-api",
          issuer: "urn:metro:auth",
        });

        user.refreshToken = user.refreshToken.filter((t) => t !== token);
        user.refreshToken.push(newRefreshToken);

        await user.save();

        console.log("New refresh token generated and saved.");
        return { message: "Token refreshed.", newRefreshToken };
      }

      console.log("Token is valid and not close to expiration.");
      return { user: decoded.user, refreshToken: token };
    } catch (err) {
      console.error("Token error:", err);

      if (err.name === "TokenExpiredError") {
        throw { status: 401, message: "Token expired." };
      } else if (err.name === "JsonWebTokenError") {
        throw { status: 401, message: "Invalid token." };
      } else {
        throw err;
      }
    }
  },

  refreshToAccessToken: async (refreshToken) => {
    const options = {
      algorithm: "RS256",
      audience: "urn:metro:user-api",
      issuer: "urn:metro:auth",
    };

    try {
      const decoded = jwt.verify(refreshToken, publicKey, options);

      const payload = { user: decoded.user };
      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "15m",
        audience: "urn:metro:user-api",
        issuer: "urn:metro:auth",
      });

      console.log("Access token created: ", accessToken);
      return accessToken;
    } catch (err) {
      console.error("Error in refreshToAccessToken: ", err);
      throw { status: 401, message: "Invalid refresh token. Please log in again." };
    }
  },

  //   createSessionId: async (refreshToken) => {
  //     try {
  //       const decoded = jwt.verify(refreshToken, publicKey, {
  //         algorithms: ["RS256"],
  //         audience: "urn:metro:user-api",
  //         issuer: "urn:metro:auth",
  //       });
  //       const user = decoded.user;

  //       const sessionData = { user: user.userName, refreshToken: refreshToken, userRoles: user.role, lastLogin: new Date().toISOString() };
  //       return sessionData;
  //     } catch (error) {
  //       return { success: false, error: error.message };
  //     }
  //   },

  setAuthCookies: async (res, accessToken, refreshToken) => {
    // const csrfToken = crypto.randomBytes(36).toString("hex");
    // const session = crypto.randomBytes(36).toString("hex");

    // const sessionId = await authService.createSessionId(refreshToken);

    // res.cookie("X-CSRF-TOKEN", csrfToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "true",
    //   sameSite: "Lax",
    //   maxAge: 15 * 60 * 1000,
    // });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("session_id", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  },

  findUser: async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw { status: 402, message: "User not found" };
    return { userName: user.name, role: user.roles.User, email: user.email, password: user.password };
  },

  getUser: async (userData) => {
    const { username, email, password, phone } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name: username, email, password: hashedPassword, phone, isAdmin: false });
    await user.save();
    return { username: user.name, email: user.email, isAdmin: user.isAdmin };
  },

  createNewUser: async (userName, email, password, phoneNumber) => {
    try {
      const findUser = await User.findOne({ email });
      if (findUser) throw { status: 409, message: "Email already exists." };
      const newUser = await User.create({ name: userName, email, password, phone: phoneNumber });
      return { id: newUser._id, email: newUser.email, userName: newUser.name, role: newUser.roles.User };
    } catch (error) {
      throw { status: 500, message: error.message };
    }
  },

  logout: async (res) => {
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "Lax" });
    res.clearCookie("session_id", { httpOnly: true, secure: true, sameSite: "Lax" });
  },
};

module.exports = authService;
