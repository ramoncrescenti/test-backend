const CustomError = require('./custom-error');

const INTERNAL_SERVER_ERROR = 'InternalServerError';

class InternalServerError extends CustomError {
  constructor() {
    super('Internal Server Error');
    this.error = INTERNAL_SERVER_ERROR;
    this.message = 'Internal Server Error';
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
module.exports.INTERNAL_SERVER_ERROR = INTERNAL_SERVER_ERROR;
