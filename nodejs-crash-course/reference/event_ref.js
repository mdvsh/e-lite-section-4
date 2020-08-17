const EventEmitter = require('events')

// create class
class MahEmitter extends EventEmitter {}

// init obj
const mahEmiter = new MahEmitter()

// create event listener
mahEmiter.on('event', () => console.log('Event fired bois!'))

// go to logger.js to see practical implementation of this