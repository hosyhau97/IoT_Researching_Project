var AppError = require('./AppError');

class ResourceNotFoundError extends AppError {
    
    constructor(resource, query) {
      super(`Resource ${resource} was not found.`);
      this.data = { resource, query };
    }
  }

  module.exports = {
      ResourceNotFoundError
  }