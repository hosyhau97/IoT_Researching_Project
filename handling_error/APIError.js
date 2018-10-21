var AppError = require('./AppError');

class ApiError extends AppError {
    constructor(message) {
      super(message);
      this.data = { message, status };
    }
  }

  module.exports = {
    ApiError
  }