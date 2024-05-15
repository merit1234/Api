const path = require('path');
const { createLogger, transports, format } = require('winston');
const fileName = path.join(__dirname, '../app.log');
// log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create logger instance
const logger = createLogger({
    transports: [
        new transports.Console({ format: logFormat }), // Log to console
        new transports.File({ filename: fileName, format: logFormat }) // Log to file
    ]
});

module.exports = logger;