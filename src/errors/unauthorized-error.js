const CustomError = require('./custom-error');

const UNAUTHORIZED_ERROR = 'UnauthorizedError';

class UnauthorizedError extends CustomError {
  constructor() {
    super('Não autorizado');
    this.error = UNAUTHORIZED_ERROR;
    this.message = 'Não autorizado';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
module.exports.UNAUTHORIZED_ERROR = UNAUTHORIZED_ERROR;
