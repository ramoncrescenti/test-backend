require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env',
});
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const oauthRoutes = require('./routes/oauth');
const userRoutes = require('./routes/user');
const { invalidUserAndOrPasswordErrorHandler } = require('./error-handlers/invalid-user-and-or-password');
const { userNotFoundErrorHandler } = require('./error-handlers/user-not-found');
const { userAlreadyExistsErrorHandler } = require('./error-handlers/user-already-exists');
const { jwtTokenErrorErrorHandler } = require('./error-handlers/jwt-token-error');
const { tokenExpiredErrorHandler } = require('./error-handlers/token-expired-error');
const { uncaughtErrorErrorHandler } = require('./error-handlers/uncaught-error');

const port = process.env.PORT ?? 3000;

/*
  TODO:
  ARRUMAR IMPORTS (igual React)
  corrigir os status codes dos erros
  olhar documentação do salt no bcrypt
  testes basicos (hash, functions, etc)

  --- DONE ---
  tirar ID dos telefones
  colocar senha secreta do JWT no .env (usar pseudorandom e base64)
  expirar token depois de 30 minutos de signIn (middleware authorization e no signUp)
*/

async function bootstrap() {
  await mongoose.connect(process.env.DB_CONNECTION);

  const app = express();

  app.use(bodyParser.json());

  app.use(oauthRoutes);
  app.use(userRoutes);

  app.use(invalidUserAndOrPasswordErrorHandler);
  app.use(userNotFoundErrorHandler);
  app.use(userAlreadyExistsErrorHandler);
  app.use(jwtTokenErrorErrorHandler);
  app.use(tokenExpiredErrorHandler);
  app.use(uncaughtErrorErrorHandler);

  app.listen(port, () => console.log(`rodando na porta ${port}`));
}

bootstrap();
