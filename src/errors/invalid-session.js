const CustomError = require('./custom-error');

const INVALID_SESSION_ERROR = 'InvalidSessionError';

class InvalidSessionError extends CustomError {
  constructor() {
    super('Sessão inválida');
    this.error = INVALID_SESSION_ERROR;
    this.message = 'Sessão inválida';
    this.statusCode = 409;
  }
}

module.exports = InvalidSessionError;
module.exports.INVALID_SESSION_ERROR = INVALID_SESSION_ERROR;
