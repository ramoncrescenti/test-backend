const UnauthorizedError = require('../errors/unauthorized-error');

const error = new UnauthorizedError();

function jwtTokenErrorHandler(err, req, res, next) {
  if (err && err.inner && err.inner.name !== 'JsonWebTokenError') return next(err);
  return res.status(error.statusCode)
    .json({ mensagem: error.message.toString() });
}

module.exports = { jwtTokenErrorHandler };
