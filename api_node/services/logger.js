var winston = require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

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