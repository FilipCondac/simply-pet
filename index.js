// Import the modules we need
var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');


// Define the database connection
const db = mysql.createConnection ({
    host: '34.105.252.160',
    user: 'fdc',
    password: '',
    database: 'simplypet'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// Create the express application object
const app = express()
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) 

//Login Page
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// Set the directory where tatic files (css, js, etc) will be
app.use(express.static(__dirname));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  All the routes will go in this file
require("./routes/routes.js")(app);

app.use(express.urlencoded({ extended: true }));


// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



