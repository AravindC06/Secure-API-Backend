const logger = require("./logger");

const responseFormatter = (res, statusCode, message, responseData = null) => {
    res.status(statusCode).json({
        status: statusCode,
        message,
        responseData
    });
    logger.info(message);
};

module.exports = responseFormatter;
