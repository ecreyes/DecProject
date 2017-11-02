//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');

module.exports = router;


//GET objetivos
router.get('/participantes', function(req, res, next) {
    try {
        models.usuario_escenario.findAll().then(function (participante) {
            res.json(participante);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST objetivos
router.post('/participantes', function(req,res,next){
    try{
        console.log(req.body);
        console.log(req.user);
        var resultado=[];

        models.usuario_escenario.create({
            idUsuario: req.user.idUsuario,
            idEscenario: req.body.escenario
        }).then(function (participante) {
            resultado.push(participante);
            res.json(resultado);
        });
        //No se maneja bien el tema del JOIN aun asi que solo se agrega en la tabla sesion :/

        /*.then(function (sesions) {
            console.log(req.body);
            models.usuario_sesion.create({
                sesionId: '1',
                UsuarioId: '1'
            }).then(function (usuario_sesion) {
                resultado.push(sesions);
                resultado.push(usuario_sesion);
                res.json(resultado);
            });
        });*/
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});


