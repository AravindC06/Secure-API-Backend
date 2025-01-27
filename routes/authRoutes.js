const express = require("express");
const router = express.Router();
const { register, login, logout, checkAuth } = require("../controllers/authController");
const auth = require("../middleware/auth");
const { loginValidationRules, registrationValidationRules } = require("../validators/authValidator");
const { loginLimiter, registerLimiter, defaultLimiter } = require("../config/rateLimiter");

//to login controller
router.post("/login", loginLimiter, loginValidationRules(), login);
//to register controller
router.post("/register", registerLimiter, registrationValidationRules(), register);
//to logout controller
router.post("/logout", defaultLimiter, auth, logout);
//to Auto-login controller
router.get("/check-auth", defaultLimiter, checkAuth);

module.exports = router;
