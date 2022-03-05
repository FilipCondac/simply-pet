// Route handler for forum web app

const { response } = require("express");
const database = require("../util/database");

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

    app.post('/signup', function(request, result) {
        let username = request.body.username;
        let password = request.body.password;
        let email = request.body.email;

        if(email && password && username){
            database.checkIfUserExists(email).then((res) =>{
                const userExists = res;
                if(!userExists){
                    database.createUser(email,username,password);
                }else{
                    response.redirect('/signup');
                }

            }).catch(err => {
                console.error(err);
                return response.sendStatus(200);
            })
        }
    });

    
    app.get('/', function(request, response) {
        // Render login template
        response.sendFile(path.join(__dirname + '/login.html'));
    });
    
    app.post('/auth', (request, response) => {
        // Capture the input fields
        let email = request.body.email;
        let password = request.body.password;
        // Ensure the input fields exists and are not empty
        if (email && password) {
            // Execute SQL query that'll select the account from the database based on the specified email and password
            //Check if user exists, then wait for promise to go through, if user exists 
            database.checkIfUserExists(email, password).then((res) => {
                const userExists = res;
                if(userExists){
                    request.session.loggedin = true;
                    request.session.email = email;
                    response.redirect('/');
                } else {
                    response.send('Incorrect email and/or Password!');
                }
                return response.end();
            }).catch(err => {
                console.error(err);
                return response.sendStatus(500);
            })
        }
    });
    
    app.get('/home', function(request, response) {
        // If the user is loggedin
        if (request.session.loggedin) {
            // Output username
            response.send('Welcome back, ' + request.session.username + '!');
        } else {
            // Not logged in
            response.send('Please login to view this page!');
        }
        response.end();
    });
}