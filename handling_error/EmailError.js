var AppError = require('./AppError');

module.exports = class EmailTakenError extends AppError {
    constructor (message) {

        super(message || 'Email can not be established the connection to Mail server.', 500);
    }
  };