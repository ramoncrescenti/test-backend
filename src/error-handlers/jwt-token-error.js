const UnauthorizedError = require('../errors/unauthorized-error');

const error = new UnauthorizedError();

function jwtTokenErrorErrorHandler(err, req, res, next) {
  console.log('Aqui é no jwtTokenError', err.inner.name);
  if (err.inner.name !== 'JsonWebTokenError') return next(err);
  return res.status(error.statusCode)
    .json(error.toJson());
}

module.exports = { jwtTokenErrorErrorHandler };
