require('dotenv').config({ path: '.env' });

const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const statusRoutes = require('./routes/status');
const oauthRoutes = require('./routes/oauth');
const userRoutes = require('./routes/user');
const { invalidUserAndOrPasswordErrorHandler } = require('./error-handlers/invalid-user-and-or-password');
const { userNotFoundErrorHandler } = require('./error-handlers/user-not-found');
const { userAlreadyExistsErrorHandler } = require('./error-handlers/user-already-exists');
const { jwtTokenErrorHandler } = require('./error-handlers/jwt-token-error');
const { tokenExpiredErrorHandler } = require('./error-handlers/token-expired-error');
const { uncaughtErrorHandler } = require('./error-handlers/uncaught-error');

const app = express();

async function bootstrap() {
  await mongoose.connect(process.env.DB_CONNECTION);

  app.use(bodyParser.json());

  app.use(statusRoutes);
  app.use(oauthRoutes);
  app.use(userRoutes);

  app.use(invalidUserAndOrPasswordErrorHandler);
  app.use(userNotFoundErrorHandler);
  app.use(userAlreadyExistsErrorHandler);
  app.use(jwtTokenErrorHandler);
  app.use(tokenExpiredErrorHandler);
  app.use(uncaughtErrorHandler);

  return app;
}

module.exports = { bootstrap };
