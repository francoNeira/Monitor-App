class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.errorCode = message;
  }
  toJSON() {
    return { status: this.status, errorCode: this.errorCode };
  }
}

module.exports = ApiError;
