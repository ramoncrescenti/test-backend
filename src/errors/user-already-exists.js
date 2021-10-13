const CustomError = require('./custom-error');

const USER_ALREADY_EXISTS_ERROR = 'UserAlreadyExistsError';

class UserAlreadyExistsError extends CustomError {
  constructor() {
    super('E-mail já existente');
    this.error = USER_ALREADY_EXISTS_ERROR;
    this.message = 'E-mail já existente';
    this.statusCode = 409;
  }
}

module.exports = UserAlreadyExistsError;
module.exports.USER_ALREADY_EXISTS_ERROR = USER_ALREADY_EXISTS_ERROR;
