const Logger = require("./logger")

console.log('joe mama');

const logger = new Logger()

logger.on('message', data => console.log('listener called', data))
logger.log('joe  mama')
logger.log('testing 123')
