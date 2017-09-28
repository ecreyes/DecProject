//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');

module.exports = router;


//GET sesiones
router.get('/sesiones', function(req, res, next) {
    try {
        models.sesion.findAll().then(function (sesions) {
            res.json(sesions);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST crear sesion
router.post('/sesiones', function(req,res,next){
    try{
        console.log(req.body);
        var resultado=[];
        models.sesion.create({
            titulo: req.body.titulo,
            escenario: req.body.escenario,
            descripcion: req.body.descripcion,
            miembros: req.body.miembros
        }).then(function (sesions) {
            resultado.push(sesions);
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