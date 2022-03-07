// Route handler for forum web app

const { response } = require("express");
const req = require("express/lib/request");
const database = require("../util/database");

module.exports = (app) => {

    // Handle our routes

    // Home page
    app.get('/', (req, res) => {
        if (req.session.loggedin) {
            //Display page if logged in 
            return res.render('index.ejs' , {loginStatus: true});
        } else {
            //Redirect to login page if not
            return res.render('index.ejs', {loginStatus: false});
        }
    });
       


    app.get('/appointments', (req, res) => {
        if (req.session.loggedin) {
            //Display page if logged in 
            return res.render('appointments.ejs', {loginStatus: true});
        } else {
            //Redirect to login page if not
            return res.redirect('/login');
        }
    });

    app.get('/petpassport', (req, res) => {
        if (req.session.loggedin) {
            //Display page if logged in 
            return res.render('petpassport.ejs', {loginStatus: true});
        } else {
            //Redirect to login page if not
            return res.redirect('/login');
        }
       
    });

    app.post('/petpassport', (req, res) => {

    });

    app.get('/pettracker', (req, res) => {
        if(req.session.loggedin){
            return res.render('pettracker.ejs', {loginStatus: true});
        }else{
            res.redirect('/login');
        }
        
    });

    //Login Page
    app.get('/login', (req, res) => {
        if(req.session.loggedin){
            return res.render('login.ejs', {loginStatus: true});
        }else{
            res.render('login.ejs' , {loginStatus: false});
        }
        
    });

    app.post('/login', (req, res) => {
      
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
                if (userExists) {
                    //Set session loggedin to true and also copy the email to the session
                    request.session.loggedin = true;
                    request.session.email = email;
                    response.redirect('/');
                } else {
                    response.redirect('/login');

                }
                return response.end();
            }).catch(err => {
                console.error(err);
                return response.sendStatus(500);
            })
        }
    });

    //Sign Up
    app.get('/signup', (req, res) => {
        if(req.session.loggedin){
            return res.redirect('/');
        }else{
            return res.render('signup.ejs' , {loginStatus: false});
        }
        
    });

    app.post('/signup', (request, response) => {

    });

    app.post('/newAuth', (request, response) => {
        let username = request.body.username;
        let password = request.body.password;
        let email = request.body.email;
        //Check if all fields are completed
        if (email && password && username) {
            //Check if user exists, if it doesn't then create the account
            database.checkIfUserExists(email).then((res) => {
                const userExists = res;
                if (!userExists) {
                    database.createUser(email, username, password);
                } else {
                    response.redirect('/home');
                }
                return response.redirect('/');
            }).catch(err => {
                console.error(err);
                return response.sendStatus(500);
            })
        }
    });

    app.get('/logout',(req,res)=>{
        req.session.destroy(function (err) {
          res.redirect('/'); //Inside a callback… bulletproof!
         });
      })


}