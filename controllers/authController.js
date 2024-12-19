const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const responseFormatter = require('../utils/responseFormatter');
const authService = require('../services/authService');
const fs = require('fs');

const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../certs/public.pem'), 'utf8');

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing.' });
    }

    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    const userId = decoded.user.id;
    const user = await User.findById(userId).select('userName isAdmin');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ userName: user.userName, isAdmin: user.isAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};


// exports.checkAuth = async (req, res) => {
//     try {
//       const validToken = await authService.checkToken(req.cookies.token);

//       if (!validToken) {
//         return res.status(401).json({ message: 'Invalid or expired token.' });
//       }

//     const user = await authService.getUserFromToken(validToken);
//         return responseFormatter(res, 200, 'Token is valid', { user: validToken.user });
//     } catch (error) {
//         return responseFormatter(res, 500, 'Server error or invalid token.',  errors.array());
//     }
//   };

exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing.' });
    }

    const validToken = await authService.checkToken(token);

    if (!validToken) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    res.status(200).json({ message: 'Token is valid', user: validToken.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {

  console.log(req.body);
  const errors = validationResult(req);
  console.log("Errors :",errors);
  if (!errors.isEmpty()) {
    return responseFormatter(res, 400, 'Validation failed', errors.array());
  }

  const findUser = await authService.findUser(req.body);
  if (findUser) {
    return responseFormatter(res, 409, 'User Exists', errors.array());
  }

  try {
    const user = await authService.register(req.body);
    const accessToken = authService.generateToken(user);
    const csrfToken = authService.setAuthCookies(res, accessToken);
    return responseFormatter(res, 200, 'User Registered with token successfully', user);
  } catch (error) {
    console.error("Register error:", error);
    responseFormatter(res, 500, 'Server Error');
  }
};

exports.login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseFormatter(res, 400, 'Validation failed', errors.array());
  }

  try {
    const user = await authService.login(req.body);
    const accessToken = authService.generateToken(user);
    const csrfToken = authService.setAuthCookies(res, accessToken);
    return responseFormatter(res, 200, 'User Registered with token successfully', user);
  } catch (error) {
    responseFormatter(res, 500, 'Server Error');
  }
};

exports.logout = (req, res) => {
  const user = authService.logout(res);
  responseFormatter(res, 200, 'User logged out successfully');
};

