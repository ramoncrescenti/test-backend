const InternalServerError = require('../errors/internal-server-error');

const error = new InternalServerError();

function uncaughtErrorErrorHandler(err, req, res, next) {
  console.error(err);
  return res.status(error.statusCode)
    .json(error.toJson());
}

module.exports = { uncaughtErrorErrorHandler };
