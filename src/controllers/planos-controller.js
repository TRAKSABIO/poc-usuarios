const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const Planos = mongoose.model('Planos');
const Boom = require('boom');
const messageHandler = require("../../common/messageHandler");

// list
exports.listPlanos = async (req, res) => {
  try {

    if (!req.params) {
      throw Boom.badRequest();
    }

    var ObjectId = require('mongodb').ObjectId;

    const data = await Usuarios.findOne(ObjectId(req.params.usuarioID));

    res.status(200).send(data.planos);
    
  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);

  }
};

exports.listPlanosByIDPlano = async (req, res) => {
  try {

    if (!req.params) {
      throw Boom.badRequest();
    }

    var ObjectId = require('mongodb').ObjectId;

    const data = await Usuarios.findOne(ObjectId(req.params.usuarioID));

    res.status(200).send(data.planos);
    
  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);

  }
};

// create plano
exports.createPlano = async (req, res) => {
  try {

    if (!req.body) {
      throw Boom.badRequest();
    }
    if (!req.body.vigencia || !req.body.nome || !req.body.carencia || !req.body.beneficios) {
      throw Boom.badRequest('vigencia, nome, carencia e beneficios devem ser informados');
    }

    //recupera o usuario
    var ObjectId = require('mongodb').ObjectId;
    const usuario = await Usuarios.findOne(ObjectId(req.params.usuarioID));
    if (!usuario) {
      throw Boom.badData('Usuário Invalido');
    }

    //cria o plano
    const plano = new Planos({
      nome: req.body.nome,
      vigencia: req.body.vigencia,
      carencia: req.body.carencia,
      beneficios: req.body.beneficios
    });

    usuario.planos.push(plano);

    // salva o usuario no mongo
    const usuarioNew = await usuario.save();

    //retorna o usuario criado com seu id
    res.status(201).send(usuarioNew._doc);
  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};


// Delete
exports.DeletePlano = async (req, res) => {
  try {
    
    //recupera o usuario
    var ObjectId = require('mongodb').ObjectId;
    const usuario = await Usuarios.findOne(ObjectId(req.params.usuarioID));
    if (!usuario) {
      throw Boom.badData('Usuário Invalido');
    }

    //cria o plano
    const plano = new Planos({
      _id: ObjectId(req.params.planoID)
    });

    usuario.planos.remove(plano);

    // salva o usuario no mongo
    const usuarioNew = await usuario.save();

    //retorna o usuario criado com seu id
    res.status(201).send(usuarioNew._doc);

  } catch (e) {
    const errorRetorn = messageHandler.genericErrorObject(e);
    return res.status(errorRetorn.code).send(errorRetorn);
  }
};