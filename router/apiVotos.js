//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');

module.exports = router;


//GET objetivos
router.get('/votos', function(req, res, next) {
    try {
        models.votos.findAll().then(function (voto) {
            res.json(voto);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});



router.post('/contarVotos', function(req, res, next) {
    try {
        console.log(req.body);
        models.votos.count(
            {where: {
                idDecision: req.body.decision ,
                idEscenario: req.body.escenario}}
        ).then(function (voto) {
            res.json(voto);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});




//POST objetivos
router.post('/votos', function(req,res,next){
    try{
        console.log(req.body);
        console.log(req.user);
        var resultado=[];

        models.votos.create({
            idUsuario: req.body.participante,
            idEscenario: req.body.escenario,
            idDecision: req.body.decision,
            prioridad: req.body.prioridad
        }).then(function (voto) {
            resultado.push(voto);
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


