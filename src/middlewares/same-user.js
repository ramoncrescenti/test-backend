const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

function sameUserMiddleware({
  headers,
  params,
}, res, next) {
  const { id } = params;
  const { authorization } = headers;
  if (!authorization) {
    throw new UnauthorizedError();
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    throw new UnauthorizedError();
  }
  const { _id } = jwt.decode(token, process.env.JWT);
  if (_id !== id) {
    throw new UnauthorizedError();
  }
  next();
}

module.exports = {
  sameUserMiddleware,
};
