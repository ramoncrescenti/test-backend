const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
  numero: String,
  ddd: String,
}, { _id: false });

module.exports = mongoose.model('Phone', PhoneSchema);

module.exports.PhoneSchema = PhoneSchema;
