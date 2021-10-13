const express = require('express');
const { param } = require('express-validator');
const expressJwt = require('express-jwt');
const { validate } = require('../middlewares/validation');
const { sameUserMiddleware } = require('../middlewares/same-user');
const { findUserById } = require('../controllers/user');

const router = express.Router();

router.get(
  '/user/:id',
  validate([
    param('id').isMongoId(),
  ]),
  expressJwt({ secret: process.env.JWT_KEY, algorithms: ['HS256'] }),
  sameUserMiddleware,
  findUserById,
);

module.exports = router;
