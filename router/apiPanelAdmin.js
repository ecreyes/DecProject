//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');

module.exports = router;


//GET sesiones
router.get('/panelAdmin', function(req, res, next) {
    try {
        models.decision.findAll().then(function (panelAdmins) {
            res.json(panelAdmins);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST crear sesion
router.post('/panelAdmin', function(req,res,next){
    try{
        console.log(req.body);
        console.log(req.user);
        var resultado=[];
        models.decision.create({
            nombre: req.body.nombre,
            mecanismo: req.body.mecanismo,
            resultado: req.body.resultado,
            idCreador: req.user.id
        }).then(function (panelAdmins) {
            resultado.push(panelAdmins);
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