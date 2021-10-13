const { INVALID_USER_AND_OR_PASSWORD_ERROR } = require('../errors/invalid-user-and-or-password');

function invalidUserAndOrPasswordErrorHandler(err, req, res, next) {
  if (err.error !== INVALID_USER_AND_OR_PASSWORD_ERROR) return next(err);
  return res.status(err.statusCode)
    .json(err.toJson());
}

module.exports = { invalidUserAndOrPasswordErrorHandler };
