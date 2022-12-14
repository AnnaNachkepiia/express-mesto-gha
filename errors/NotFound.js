const { NOT_FOUND } = require('./errorCode');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = {
  NotFound,
};
