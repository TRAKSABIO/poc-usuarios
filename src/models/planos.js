const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  vigencia: {
    type: Number,
    required: true
  },
  carencia: {
    type: Number,
    required: true
  },
  beneficios: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Planos', schema);