const {
  findUserById: findUserByIdService,
} = require('../services/user');

async function findUserById({ params }, res) {
  const user = await findUserByIdService({ id: params.id });
  res.json(user);
}

module.exports = {
  findUserById,
};
