const { body } = require("express-validator");

const registrationValidationRules = () => {
  return [
    body("userName").notEmpty().trim().escape().isLength({ min: 3 }),

    body("email").isEmail().normalizeEmail(),

    body("password").isLength({ min: 6 }).trim().escape(),

    body("phone").optional().isNumeric().isLength({ min: 10, max: 15 }).trim().escape(),
  ];
};

const loginValidationRules = () => {
  return [body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 }).trim().escape()];
};

module.exports = {
  registrationValidationRules,
  loginValidationRules,
  csrfProtection,
};
