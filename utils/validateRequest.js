const { validationResult } = require("express-validator");
const responseFormatter = require("./responseFormatter");

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseFormatter(res, 400, "Validation failed", errors.array());
  }
  return null;
};

module.exports = validateRequest;
