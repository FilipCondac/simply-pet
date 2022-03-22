// Route handler for forum web app

const {response} = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { VARCHAR } = require("mysql/lib/protocol/constants/types");
const database = require("../util/database");

module.exports = (app) => {

    // Handle our routes

    // Home page
    app.get('/', (req, res) => {
        if (req.session.loggedin) {
            //Display page if logged in 
            return res.render('index.ejs', {
                loginStatus: true
            });
        } else {
            //Redirect to login page if not
            return res.render('index.ejs', {
                loginStatus: false
            });
        }
    });


    //Appointment
    app.get('/appointments', (req, res) => {
        if (req.session.loggedin) {
            //Display page if logged in 
            return res.render('appointments.ejs', {
                loginStatus: true
            });
        } else {
            //Redirect to login page if not
            return res.redirect('/login');
        }
    });

    //Create Appointment
    app.post('/createAppointment', (req, res) => {
        let appointmentDate = req.body.appointmentDate;
        let appointmentTime = req.body.appointmentTime;
        let appointmentFirstName = req.body.appointmentFirstName;
        let appointmentLastName = req.body.appointmentLastName;
        let appointmentNumber = req.body.appointmentNumber;
        let appointmentSeverity = req.body.appointmentSeverity;
        let appointmentIssue = req.body.appointmentIssue;
        let appointmentDescription = req.body.appointmentDescription;
        let petName = req.body.petName;
        let email = req.session.email;

        
       

        //Check if fields are filled
        if (appointmentFirstName && appointmentLastName && appointmentNumber && appointmentIssue && appointmentDescription &&
            petName && email) {
            database.createAppointment(appointmentDate, appointmentTime, appointmentFirstName, appointmentLastName, appointmentNumber, appointmentIssue, appointmentDescription, petName, email, appointmentSeverity).then((resolve) => {
                const dataInserted = resolve;
                if (dataInserted) {
                    res.redirect('/appointments');
                }
                return res.end();
            }).catch(err => {
                console.error(err);
                return res.sendStatus(500);
            })
        }
    })

    //Pet passport
    app.get('/petpassport', (req, res) => {
        if (req.session.loggedin) {
            //Display page if logged in 
            let email = req.session.email;
            database.getPet(email).then((resolve) => {
                const results = resolve;
                if (results) {
                    return res.render('petpassport.ejs', {
                        //Return queried results from our function in database.js
                        loginStatus: true,
                        petResults: results
                    });
                }
            })
        } else {
            return res.redirect('/login');
        }
    });
    //Pet tracker
    app.get('/pettracker', (req, res) => {
        if (req.session.loggedin) {
            return res.render('pettracker.ejs', {
                loginStatus: true
            });
        } else {
            res.redirect('/login');
        }

    });

    //About us
    app.get('/about_us', (req, res) => {
        if (req.session.loggedin) {
            return res.render('about_us.ejs', {
                loginStatus: true
            });
        } else {
            return res.render('about_us.ejs', {
                loginStatus: false
            });
        }

    });

    //Contact us
    app.get('/contact_us', (req, res) => {
        if (req.session.loggedin) {
            return res.render('contact_us.ejs', {
                loginStatus: true
            });
        } else {
            return res.render('contact_us.ejs', {
                loginStatus: false
            });
        }

    });

    //Login Page
    app.get('/login', (req, res) => {
        if (req.session.loggedin) {
            return res.render('login.ejs', {
                loginStatus: true
            });
        } else {
            res.render('login.ejs', {
                loginStatus: false
            });
        }

    });

    //Login system
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

    //Sign Up page
    app.get('/signup', (req, res) => {
        if (req.session.loggedin) {
            return res.redirect('/');
        } else {
            return res.render('signup.ejs', {
                loginStatus: false
            });
        }

    });

    //Sign up form action
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

    //Logout
    app.get('/logout', (req, res) => {
        req.session.destroy(function (err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });
    
    //Add pet to account
    app.post('/addPet', (req, res) => {
        //Request variables from the body
        let petName = req.body.petname;
        let petAge = req.body.petage;
        let petType = req.body.pettype;
        let petBreed = req.body.petbreed;
        let petVaccinated = req.body.vacstat;
        let petLastApp = req.body.lastaptdate;
        let petVetPractice = req.body.petvet;
        let petVetName = req.body.petvetname;
        let email = req.session.email;

        //Call function and insert data if the user input is good
        if (petName && petAge && petType && petBreed && petVaccinated && petLastApp && petVetPractice &&
            petVetName && email) {
            database.createPet(petName, petAge, petType, petBreed, petVaccinated, petLastApp, petVetPractice, petVetName, email).then((resolve) => {
                const dataInserted = resolve;
                if (dataInserted) {
                    res.redirect('/petpassport');
                }
                return res.end();
            }).catch(err => {
                console.error(err);
                return res.sendStatus(500);
            })
        }
    });

    
}