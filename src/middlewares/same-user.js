const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const unauthorizedError = new UnauthorizedError();

function sameUserMiddleware({
  headers,
  params,
}, res, next) {
  const { id } = params;
  const { authorization } = headers;
  if (!authorization) {
    res.status(unauthorizedError.statusCode)
      .json(unauthorizedError.toJson());
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    res.status(unauthorizedError.statusCode)
      .json(unauthorizedError.toJson());
  }
  const { _id } = jwt.decode(token, process.env.JWT);
  if (_id !== id) {
    res.status(unauthorizedError.statusCode)
      .json(unauthorizedError.toJson());
  }
  next();
}

module.exports = {
  sameUserMiddleware,
};
