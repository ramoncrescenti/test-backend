const { USER_ALREADY_EXISTS_ERROR } = require('../errors/user-already-exists');

function userAlreadyExistsErrorHandler(err, req, res, next) {
  if (err.error !== USER_ALREADY_EXISTS_ERROR) return next(err);
  return res.status(err.statusCode)
    .json({ mensagem: err.message.toString() });
}

module.exports = { userAlreadyExistsErrorHandler };
