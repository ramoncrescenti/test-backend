const bcrypt = require('bcrypt');
const user = require('../models/user');
const UserNotFound = require('../errors/user-not-found');
const UserAlreadyExists = require('../errors/user-already-exists');
const InvalidUserAndOrPasswordError = require('../errors/invalid-user-and-or-password');

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

async function checkEmailToSignIn({ email }) {
  const foundUser = await user.findOne({
    email,
  });
  if (!foundUser) {
    throw new InvalidUserAndOrPasswordError();
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

async function convertPasswordToHash(password) {
  const hashCost = 12;
  return bcrypt.hash(password, hashCost);
}

async function comparePasswordToHash(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

function createUser(body) {
  return user.create(body);
}

function updateUser(filter, update) {
  return user.findOneAndUpdate(filter, update, { new: true });
}

module.exports = {
  findUserById,
  findUserByEmail,
  checkEmailToSignIn,
  checkUserWithEmailAlreadyExists,
  createUser,
  updateUser,
  convertPasswordToHash,
  comparePasswordToHash,
};
