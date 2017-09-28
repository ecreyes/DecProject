//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');

module.exports = router;


//GET usuarios
router.get('/usuarios', function(req, res, next) {
	try {
		models.Usuario.findAll().then(function (user) {
			res.json(user);
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});

//GET un usuario con id determinado
router.get('/usuarios/:id', function(req, res, next) {
	try {
		console.log(req.params.id);
		models.Usuario.findAll({
			where: {
				id: req.params.id
			}
		}).then(function (user) {
			res.json(user);
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});

//POST crear usuario
router.post('/usuarios', function(req,res,next){
try{
	console.log(req.body.permiso);
	var resultado=[];
	models.Usuario.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	}).then(function (user) {
		models.Rol.create({
			permiso: req.body.permiso,
			UsuarioId: user.id
		}).then(function (rol) {
			resultado.push(user);
			resultado.push(rol);
			res.json(resultado);
		});
	});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

router.put('/usuarios/:id', function(req,res,next){
	try{

		models.Usuario.findOne({ where: {id:req.params.id} }).then(function (user) {
			if(req.body.username){
				if(req.body.email) {
					user.updateAttributes({
						username: req.body.username,
						email: req.body.email
					}).then(function (result) {
						res.json(result);
					})
				}
				else {
					user.updateAttributes({
						username: req.body.username
					}).then(function (result) {
						res.json(result);
					})
				}

			}
		});
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

router.delete('/usuarios/:id', function(req,res,next){
	try{
		models.Usuario.destroy({where: {id: req.params.id} }).then(function () {
			return models.Usuario.findAll().then(function (user) {
				res.json(user);
			})
		})
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

