var winston = require('winston');

module.exports = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/apiLog.log",
            maxsize: 100000,
            maxFiles: 10
        })
    ]
});

// logger.log('info', 'Log 2');
// logger.info('Log 3');