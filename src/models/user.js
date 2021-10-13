const mongoose = require('mongoose');
const { PhoneSchema } = require('./phone');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  salt: String,
  telefones: [PhoneSchema],
  data_criacao: Date,
  data_atualizacao: Date,
}, { timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' } });

module.exports = mongoose.model('User', UserSchema);
