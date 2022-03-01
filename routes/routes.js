// Route handler for forum web app
const db = require('../util/db');

module.exports = function (app) {

    // Handle our routes

    // Home page
    app.get('/', function(req, res) {
       return res.render('index.ejs');
      });

    app.get('/appointments', function(req, res) {
        return res.render('appointments.ejs');
    });

    app.get('/petpassport', function(req, res) {
        return res.render('petpassport.ejs');
    });

    app.post('/petpassport', function(req, res) {
    
    });

    app.get('/pettracker', function(req, res) {
        return res.render('pettracker.ejs');
    });

    app.get('/login', function(req, res) {
        console.log("Working");
        return res.render('login.ejs');
    });

    app.post('/login', function(req, res) {
        console.log(req.body);
        db.test();
        return res.sendStatus(200)
    });

    app.get('/signup', function(req, res) {
        return res.render('signup.ejs');
    });

    app.post('/signup', function(req, res) {
    });
}