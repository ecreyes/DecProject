/**
 * Created by famancil on 21-08-16.
 */
// config/passport.js
//var Usuario= require('./models/usuario');
//var Sequelize = require('sequelize');

var models  = require('../models');


// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345'
});

connection.query('USE proyecto');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("ME SALIO" +user.idUsuario);
        done(null, user.idUsuario);
    });

    // used to deserialize the user
    passport.deserializeUser(function(idUsuario, done) {
        connection.query("select * from usuario where idUsuario = "+idUsuario,function(err,rows){
            done(err, rows[0]);
        });
    });





    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from usuario where email = '"+email+"'",function(err,rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    if(password == 0){
                        var newUserMysql = new Object();
                        models.usuario.create({
                            username: email,
                            password: 0,
                            email: 0,
                            registrado: 0
                        }).then(function (result) {
                            console.log(result);
                            newUserMysql.idUsuario = result.idUsuario;
                            return done(null, newUserMysql);
                        });
                    }else{
                        var newUserMysql = new Object();
                        models.usuario.create({
                            username: req.body.user,
                            password: password,
                            email: email,
                            registrado: 1
                        }).then(function (result) {
                            console.log(result);
                            newUserMysql.idUsuario = result.idUsuario;
                            return done(null, newUserMysql);
                        });
                    }

                }
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM `usuario` WHERE `email` = '" + email + "'",function(err,rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);

            });



        }));

};