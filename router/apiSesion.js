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
        if(req.user){
            models.sesion.create({
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                miembros: req.body.miembros,
                estado: 0,
                idModerador:req.user.idUsuario
            }).then(function (sesions) {
                resultado.push(sesions);
                res.json(resultado);
            });
        }else{
            models.sesion.create({
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                miembros: req.body.miembros,
                idModerador:2,
                estado: 0
            }).then(function (sesions) {
                resultado.push(sesions);
                res.json(resultado);
            });
        }
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

router.get('/sesiones/:id', function(req, res, next) {
    try {
        console.log(req.params.id);
        models.sesion.findOne({
            where: {
                idSesion: req.params.id
            }
        }).then(function (sesions) {
            //res.json(sesions);
            res.render('home/salas.html',{titulo: sesions.titulo,descripcion : sesions.descripcion,miembros: sesions.miembros,idSesion: req.params.id});
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});