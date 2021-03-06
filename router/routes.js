/**
 * Created by famancil on 21-08-16.
 */
var nodemailer = require('nodemailer');
var models  = require('../models');

module.exports = function(app, passport) {

    app.get('/', function (req, res) {
        res.render('home/index.html');
    });

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('home/login.html', { message: req.flash('loginMessage') });
    });

    app.get('/loginInvitado', function (req, res) {
        res.render('home/loginInvitado.html');
    });
    app.get('/loginAdmin', function (req, res) {
        res.render('home/loginAdmin.html');
    });
    app.get('/panelAdmin', function (req, res) {
        res.render('admin/panelAdmin.html');
    });


    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/loginAdmin', passport.authenticate('admin-login', {
        successRedirect : '/panelAdmin', // redirect to the secure profile section
        failureRedirect : '/loginAdmin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('home/signup.html', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : 'profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/sendemail', function(req,res,next){
        try{
            var email = req.body.email;
            var sala = req.body.sala;
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "decproject2@gmail.com",
                    pass: "analisis123"
                }
            });
            var mailOptions = {
                from: "DecProject", // sender address
                to: email, // list of receivers
                subject: "Invitación a sala", // Subject line
                text: "Te invitaron a que te unas a http://localhost:3000/apiSesion/sesiones/" + sala // html body
            }
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log("ocurrio un error, intentalo mas tarde");
                }else{
                    res.send("email enviado con exito");
                }

            });
        }
        catch(ex){
            console.error("Internal error:"+ex);
            return next(ex);
        }
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/sesiones', function (req, res) {
        res.render('home/sesiones.html');
    });

    app.get('/salas', function (req, res) {
        res.render('home/salas.html');
    });

    app.get('/salas/:id', function (req,res) {
        res.redirect('/apiSesion/sesiones/'+req.params.id);
    });
    app.get('/escenarios/:id', function (req,res) {
        res.redirect('/apiEscenario/escenarios/'+req.params.id);
    });
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('usuario/profile.html');
    });

    app.get('/chat', function(req, res) {
        res.render('home/chat.html');
    });

}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
