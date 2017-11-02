//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');

module.exports = router;


//GET objetivos
router.get('/escenarios', function(req, res, next) {
    try {
        models.escenario.findAll().then(function (escenarios) {
            res.json(escenarios);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST objetivos
router.post('/escenarios', function(req,res,next){
    try{
        console.log(req.body);
        var resultado=[];
        models.escenario.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            idSesion: req.body.sala
        }).then(function (escenarios) {
            resultado.push(escenarios);
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

router.get('/escenarios/:id', function(req, res, next) {
    try {
        console.log(req.params.id);
        models.escenario.findOne({
            where: {
                idEscenario: req.params.id
            }
        }).then(function (escenarios) {
            //res.json(sesions);
            res.render('home/escenarios.html',{titulo: escenarios.titulo,descripcion : escenarios.descripcion, idEscenario: req.params.id});
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});