const {
  validationResult,
} = require('express-validator');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => { return `${msg}: ${value}`; };

  const errors = validationResult(req).formatWith(errorFormatter);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400)
    .json({ mensagem: errors.mapped() });
};

module.exports = {
  validate,
};
