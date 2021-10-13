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
  res.json(retorno);
}

async function signUp({ body }, res) {
  const retorno = await signUpService(body);
  res.json(retorno);
}

module.exports = {
  signIn,
  signUp,
};
