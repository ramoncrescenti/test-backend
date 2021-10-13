const { USER_NOT_FOUND_ERROR } = require('../errors/user-not-found');

function userNotFoundErrorHandler(err, req, res, next) {
  if (err.error !== USER_NOT_FOUND_ERROR) return next(err);
  return res.status(err.statusCode)
    .json(err.toJson());
}

module.exports = { userNotFoundErrorHandler };
