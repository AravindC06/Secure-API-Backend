const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const responseFormatter = require("../utils/responseFormatter");
const authService = require("../services/authService");
const fs = require("fs");
const path = require("path");
const validateRequest = require("../utils/validateRequest");
const publicKey = fs.readFileSync(path.resolve(__dirname, "../certs/public.pem"), "utf8");

exports.register = async (req, res) => {
  const validationError = validateRequest(req, res);
  if (validationError) return;

  const { userName, email, password, phoneNumber } = req.body;

  try {
    const newUser = await authService.createNewUser(userName, email, password, phoneNumber);
    const refreshToken = await authService.generateRefreshToken(newUser);
    const accessToken = await authService.refreshToAccessToken(refreshToken);
    await authService.setAuthCookies(res, accessToken, refreshToken);
    return responseFormatter(res, 200, "User Registered successfully!", { userName: newUser.userName, role: newUser.role });
  } catch (error) {
    const { status = 500, message = "Server Error" } = error;
    responseFormatter(res, status, message);
  }
};

exports.login = async (req, res) => {
  const validationError = validateRequest(req, res);
  if (validationError) return;

  const { email, password } = req.body;

  try {
    const checkUser = await authService.findUser(email);
    const authenticatedUser = await authService.login({ password, user: checkUser });
    const refreshToken = await authService.generateRefreshToken(authenticatedUser);
    const accessToken = await authService.refreshToAccessToken(refreshToken);
    await authService.setAuthCookies(res, accessToken, refreshToken);
    return responseFormatter(res, 200, "User Registered with token successfully", authenticatedUser);
  } catch (error) {
    const { status = 500, message = "Server Error" } = error;
    responseFormatter(res, status, message);
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const sessionToken = req.cookies.session_id;
    const accessToken = req.cookies.accessToken;
    const { user, refreshToken } = await authService.verifyAndHandleToken(sessionToken);
    const GaccessToken = await authService.refreshToAccessToken(refreshToken);
    await authService.setAuthCookies(res, GaccessToken, refreshToken);
    return responseFormatter(res, 200, "Access Token has been provided", user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Authentication token is missing." });
    }

    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    const userId = decoded.user.id;
    const user = await User.findById(userId).select("userName isAdmin");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ userName: user.userName, isAdmin: user.isAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

exports.logout = (req, res) => {
  const user = authService.logout(res);
  responseFormatter(res, 200, "User logged out successfully");
};
