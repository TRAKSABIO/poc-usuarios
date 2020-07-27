const mongoose = require('mongoose').set('debug', true);
const Boom = require('boom');
const Usuarios = mongoose.model('Usuarios');
const messageHandler = require("../../common/messageHandler");
const usuarios = require('../models/usuarios');

// list
exports.listUsuarios = async (req, res) => {
  try {
    var filter;
    if (req.query.cpf) {
      filter = {
        cpf: req.query.cpf,
      }
    }
    const data = await Usuarios.find(filter);
    res.status(200).send(data);
  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};

exports.listUsuariosByID = async (req, res) => {
  try {

    if (!req.params) {
      throw Boom.badRequest();
    }

    var ObjectId = require('mongodb').ObjectId;

    const data = await Usuarios.findOne(ObjectId(req.params.usuarioID));

    res.status(200).send(data);

  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};

// create
exports.createUsuarios = async (req, res) => {
  try {

    if (!req.body) {
      throw Boom.badRequest();
    }
    if (!req.body.cpf || !req.body.nome) {
      throw Boom.badRequest('cpf ou nome devem ser informados');
    }

    const usuario = new Usuarios({
      nome: req.body.nome,
      cpf: req.body.cpf,
      financeiros: req.body.financeiros,
      enderecos: req.body.enderecos
    }
    );

    // salva o usuario no mongo
    const usuarioNew = await usuario.save();

    //retorna o usuario criado com seu id
    res.status(201).send(usuarioNew._doc);

  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};

// update
exports.UpdateUsuario = async (req, res) => {
  try {

    if (!req.body) {
      throw Boom.badRequest();
    }
    if (!req.params) {
      throw Boom.badRequest();
    }
    //recupera o usuario
    var ObjectId = require('mongodb').ObjectId;
    var usuario = await Usuarios.findOneAndUpdate(ObjectId(req.params.usuarioID));

    if (!usuario) {
      throw Boom.badData('Usuário Invalido');
    }

    const update = new Usuarios({
      _id: ObjectId(req.params.usuarioID),
      nome: req.body.nome,
      cpf: req.body.cpf,
      financeiros: req.body.financeiros,
      enderecos: req.body.enderecos
    }
    );


    const usuarioupdated = await usuario.updateOne();

    //retorna o usuario atualizado com seu id
    //result = usuario
    res.status(200).send();

  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};

// Delelete
exports.DeleteUsuarioByID = async (req, res) => {
  try {

    if (!req.params) {
      throw Boom.badRequest();
    }

    var ObjectId = require('mongodb').ObjectId;

    const data = await Usuarios.deleteOne({ "_id": ObjectId(req.params.usuarioID) });
    if (data && data.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(204).send(`Cliente ID ${req.params.usuarioID} não localizado!`);
    }

  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};