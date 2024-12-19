const morgan = require('morgan');
const logger = require('../utils/logger');

const morganFormat = ':method :url :status :response-time ms';

const winstonStream = {
    write: (message) => {
        const logObject = {
            method: message.split(' ')[0],
            url: message.split(' ')[1],
            status: message.split(' ')[2],
            responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
    },
};

const morganMiddleware = morgan(morganFormat, { stream: winstonStream });

module.exports = morganMiddleware;
