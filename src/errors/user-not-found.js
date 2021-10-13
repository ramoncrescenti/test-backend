const CustomError = require('./custom-error');

const USER_NOT_FOUND_ERROR = 'UserNotFoundError';

class UserNotFoundError extends CustomError {
  constructor() {
    super('Usuário não encontrado');
    this.error = USER_NOT_FOUND_ERROR;
    this.message = 'Usuário não encontrado';
    this.statusCode = 404;
  }
}

module.exports = UserNotFoundError;
module.exports.USER_NOT_FOUND_ERROR = USER_NOT_FOUND_ERROR;
