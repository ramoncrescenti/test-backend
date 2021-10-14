const InvalidSessionError = require('../errors/invalid-session');

const error = new InvalidSessionError();

function tokenExpiredErrorHandler(err, req, res, next) {
  if (err && err.inner && err.inner.name !== 'TokenExpiredError') return next(err);
  return res.status(error.statusCode)
    .json({ mensagem: error.message.toString() });
}

module.exports = { tokenExpiredErrorHandler };
