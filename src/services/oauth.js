const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  findUserByEmail,
  checkUserWithEmailAlreadyExists,
  createUser,
  generateHashPassword,
} = require('./user');
const InvalidUserAndOrPasswordError = require('../errors/invalid-user-and-or-password');

async function signIn({
  email,
  senha,
}) {
  const user = await findUserByEmail({
    email,
  });
  const checkPassword = await bcrypt.compare(senha, user.senha);
  if (!checkPassword) {
    throw new InvalidUserAndOrPasswordError();
  }
  const userJson = user.toJSON();
  return {
    ...userJson,
    ultimo_login: new Date(),
    token: jwt.sign(userJson, process.env.JWT_KEY, { expiresIn: '30m' }),
  };
}

async function signUp(body) {
  const user = {
    ...body,
    senha: await generateHashPassword(body.senha),
  };
  await checkUserWithEmailAlreadyExists({ email: user.email });
  const createdUser = await createUser(user);
  return signIn({ email: createdUser.email, senha: body.senha });
}

module.exports = {
  signIn,
  signUp,
};
