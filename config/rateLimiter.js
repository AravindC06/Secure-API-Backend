const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    message: {
        code: 429,
        message: 'Too many requests, please try again later.',
    },
});

module.exports = limiter;