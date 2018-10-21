class AppError extends Error {
  constructor(message, httpStatus) {
    super(message, httpStatus);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus;
  };
}

module.exports = {
  AppError
}