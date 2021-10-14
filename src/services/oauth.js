const jwt = require('jsonwebtoken');
const {
  checkEmailToSignIn,
  checkUserWithEmailAlreadyExists,
  createUser,
  updateUser,
  convertPasswordToHash,
  comparePasswordToHash,
} = require('./user');
const InvalidUserAndOrPasswordError = require('../errors/invalid-user-and-or-password');

async function signIn({
  email,
  senha,
}) {
  const user = await checkEmailToSignIn({
    email,
  });
  const checkPassword = await comparePasswordToHash(senha, user.senha);
  if (!checkPassword) {
    throw new InvalidUserAndOrPasswordError();
  }
  let updatedUser = await updateUser(
    { email: user.email },
    { ultimo_login: new Date() },
  );
  const { token, ...updatedUserWithoutToken } = updatedUser.toJSON();
  updatedUser = await updateUser(
    { email: updatedUser.email },
    { token: jwt.sign(updatedUserWithoutToken, process.env.JWT_KEY, { expiresIn: '30m' }) },
  );
  return updatedUser.toJSON();
}

async function signUp(body) {
  const user = {
    ...body,
    senha: await convertPasswordToHash(body.senha),
  };
  await checkUserWithEmailAlreadyExists({ email: user.email });
  const createdUser = await createUser(user);
  return signIn({ email: createdUser.email, senha: body.senha });
}

module.exports = {
  signIn,
  signUp,
};
