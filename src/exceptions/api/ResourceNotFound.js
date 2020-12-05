const ApiError = require('./ApiError');

class ResourceNotFound extends ApiError {
  constructor() {
    super(404, 'RESOURCE_NOT_FOUND');
  }
}
module.exports = ResourceNotFound;
