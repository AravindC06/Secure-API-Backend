const rateLimit = require("express-rate-limit");

const defaultLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 500,
  message: {
    code: 429,
    message: "Too many requests, please try again later.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    code: 429,
    message: "Too many login attempts, please try again later.",
  },
});

const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: {
    code: 429,
    message: "Too many registration attempts, please try again later.",
  },
});

const resetPasswordLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: {
    code: 429,
    message: "Too many password reset attempts, please try again later.",
  },
});

module.exports = { defaultLimiter, loginLimiter, registerLimiter, resetPasswordLimiter };
