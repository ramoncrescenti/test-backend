const bcrypt = require('bcrypt');
const user = require('../models/user');
const UserNotFound = require('../errors/user-not-found');
const UserAlreadyExists = require('../errors/user-already-exists');

async function findUserById({ id }) {
  const foundUser = await user.findById(id);
  if (!foundUser) {
    throw new UserNotFound();
  }
  return foundUser;
}

async function findUserByEmail({ email }) {
  const foundUser = await user.findOne({
    email,
  });
  if (!foundUser) {
    throw new UserNotFound();
  }
  return foundUser;
}

async function checkUserWithEmailAlreadyExists({ email }) {
  const foundUser = await user.findOne({
    email,
  });

  if (foundUser) {
    throw new UserAlreadyExists();
  }
}

async function generateHashPassword(password) {
  const hashCost = 12;
  return bcrypt.hash(password, hashCost);
}

function createUser(body) {
  return user.create(body);
}

module.exports = {
  findUserById,
  findUserByEmail,
  checkUserWithEmailAlreadyExists,
  createUser,
  generateHashPassword,
};
