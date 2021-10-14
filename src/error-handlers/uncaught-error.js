const InternalServerError = require('../errors/internal-server-error');

const error = new InternalServerError();

function uncaughtErrorHandler(err, req, res, next) {
  console.error(err);
  return res.status(error.statusCode)
    .json({ mensagem: error.message.toString() });
}

module.exports = { uncaughtErrorHandler };
