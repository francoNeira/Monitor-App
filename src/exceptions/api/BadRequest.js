const ApiError = require('./ApiError');

class BadRequest extends ApiError {
  constructor() {
    super(400, 'BAD_REQUEST');
  }
}
module.exports = BadRequest;
