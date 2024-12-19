const { body } = require('express-validator');

const registrationValidationRules = () => {
    return [
        body('userName')
            .notEmpty()
            .trim().escape()
            .isLength({ min: 3 }),

        body('email')
            .isEmail()
            .normalizeEmail(),

        body('password')
            .isLength({ min: 6 })
            .trim()
            .escape(),

        body('phone')
            .optional()
            .isNumeric()
            .isLength({ min: 10, max: 15 })
            .trim().escape()
    ];
};

const loginValidationRules = () => {
    return [
        body('email').isEmail().normalizeEmail(),
        body('password')
            .isLength({ min: 6 }).trim()
            .escape()
    ];
};

const csrfProtection = (req, res, next) => {
    const csrfTokenFromRequest = req.headers['x-csrf-token'] || req.body.csrfToken;
    const csrfTokenFromCookie = req.cookies.csrfToken;

    if (csrfTokenFromRequest && csrfTokenFromRequest === csrfTokenFromCookie) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid CSRF token' });
    }
}

module.exports = {
    registrationValidationRules,
    loginValidationRules,
    csrfProtection
};
