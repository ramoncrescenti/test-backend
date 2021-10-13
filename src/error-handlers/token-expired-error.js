const InvalidSessionError = require('../errors/invalid-session');

const error = new InvalidSessionError();

function tokenExpiredErrorHandler(err, req, res, next) {
  console.log('Aqui é no TokenExpiredError', err.inner.name);
  if (err.inner.name !== 'TokenExpiredError') return next(err);
  return res.status(error.statusCode)
    .json(error.toJson());
}

module.exports = { tokenExpiredErrorHandler };
