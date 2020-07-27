const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Planos = require('../models/planos').schema

const schema = new Schema({
  nome:
  {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  financeiros: [
    {
      tipo: {
        type: String,
        required: false
      },
      agencia: {
        numero: {
          type: Number,
          required: false
        },
        digito: {
          type: String,
          required: false
        }
      },
      conta: {
        numero: {
          type: Number,
          required: false
        },
        digito: {
          type: String,
          required: false
        }
      }
    }
  ],
  enderecos: [
    {
      tipo: {
        type: String,
        required: true
      },
      logradouro: {
        type: String,
        required: true
      },
      numero: {
        type: Number,
        required: true
      },
      cep: {
        type: Number,
        required: true
      },
      bairro: {
        type: String,
        required: true
      },
      cidade: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true
      }
    }
  ],
  planos: [Planos]
});

module.exports = mongoose.model('Usuarios', schema);