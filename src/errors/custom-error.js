const CUSTOM_ERROR = 'ERROR';

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.error = CUSTOM_ERROR;
    this.message = 'Error';
    this.statusCode = 500;
  }

  toJson() {
    return {
      error: this.error,
      message: this.message,
    };
  }
}

module.exports = CustomError;
module.exports.CUSTOM_ERROR = CUSTOM_ERROR;
