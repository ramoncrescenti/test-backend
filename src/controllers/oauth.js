const {
  signIn: signInService,
  signUp: signUpService,
} = require('../services/oauth');

async function signIn({ body }, res) {
  const user = {
    email: body.email,
    senha: body.senha,
  };
  const retorno = await signInService(user);
  res.status(200).json(retorno);
}

async function signUp({ body }, res) {
  const retorno = await signUpService(body);
  res.status(201).json(retorno);
}

module.exports = {
  signIn,
  signUp,
};
