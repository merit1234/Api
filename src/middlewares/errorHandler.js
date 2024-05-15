const logger = require("../services/winstonLogger");

function errorHandler(err, req, res, next) {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
}

module.exports = errorHandler;