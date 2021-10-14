const CustomError = require('./custom-error');

const INVALID_USER_AND_OR_PASSWORD_ERROR = 'InvalidUserAndOrPasswordError';

class InvalidUserAndOrPasswordError extends CustomError {
  constructor() {
    super('Usuário e/ou senha inválidos');
    this.error = INVALID_USER_AND_OR_PASSWORD_ERROR;
    this.message = 'Usuário e/ou senha inválidos';
    this.statusCode = 401;
  }
}

module.exports = InvalidUserAndOrPasswordError;
module.exports.INVALID_USER_AND_OR_PASSWORD_ERROR = INVALID_USER_AND_OR_PASSWORD_ERROR;
