const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
} = require("./errorCode");

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_ERROR;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = {
  BadRequest,
  NotFound,
  InternalError,
  Unauthorized,
  Forbidden,
  Conflict,
};
