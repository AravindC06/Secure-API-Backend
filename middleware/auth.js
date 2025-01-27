const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const responseFormatter = require("../utils/responseFormatter");
const authService = require("../services/authService");
const publicKey = fs.readFileSync(path.resolve(__dirname, "../certs/public.pem"), "utf8");

const auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.session_id;

  if (refreshToken) {
    try {
      const accessToken = await authService.refreshToAccessToken(refreshToken);
      await authService.setAuthCookies(res, accessToken, refreshToken);
    } catch (error) {}
  }

  if (!accessToken && !refreshToken) {
    return responseFormatter(res, 210, "Internal Browser Error! Please login again.");
  }

  try {
    const decodedHeader = jwt.decode(accessToken, { complete: true });
    if (decodedHeader && decodedHeader.header.alg === "RS256") {
      const decoded = jwt.verify(refreshToken, publicKey, { algorithms: ["RS256"] });
      req.user = decoded.user;
      next();
    } else {
      return res.status(401).json({ msg: "Signature does not match!" });
    }
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
