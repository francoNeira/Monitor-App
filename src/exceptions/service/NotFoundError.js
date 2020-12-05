const ServiceError = require('./ServiceError');

class NotFoundError extends ServiceError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
