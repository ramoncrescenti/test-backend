const express = require('express');
const { body } = require('express-validator');
const {
  signUp,
  signIn,
} = require('../controllers/oauth');
const { validate } = require('../middlewares/validation');

const router = express.Router();

router.post(
  '/signup',
  validate([
    body('nome').isString().isEmpty(),
    body('email').isEmail(),
    body('senha').isString(),
    body('telefones').isArray(),
    body('telefones.*.numero').isAlphanumeric('pt-BR').isLength({ min: 8, max: 9 }),
    body('telefones.*.ddd').isString().isLength({ min: 2, max: 2 }),
  ]),
  signUp,
);
router.post(
  '/signin',
  validate([
    body('email').isEmail(),
    body('senha').isString(),
  ]),
  signIn,
);

module.exports = router;
