// A web application to provide discussion forums
// Import the modules we need
var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
// const { arrayBuffer } = require('stream/consumers');

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
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) 

//Login Page
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// app.use((req, res, next) => {
//    	console.log(req.body);
//     next();
// });


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

//Check for Leap Year

//isLeapYear = (year) => {
//     return(year % 4 === 0 && year % 100 !== 0 && year % 400 
//         !==0) || (year% 100 === 0 && year % 400 === 0)
// }

// getFebDays = (year) => {
//     return isLeapYear(year) ? 29 : 28
// }

// let calendar = document.querySelector('.calendar')
// const month_names = ['January','February','March','April','May',
// 'June','July','August','September','October','November','December']

// let month_picker = document.querySelector('#month-picker')
// //Generate the calendar days

// generateCalendar = (month,year) => {
//     let calendar_days = document.querySelector('.calendar-days')
//     calendar_days.innerHTML = ' '

//     let calendar_header_year = document.querySelector('#year')

//     let days_of_the_month = [31, getFebDays(year),31,30,31,30,31,31,30,31,30,
//     31]

//     let currDate = new Date()

//     month_picker.innerHTML = month_names[month]
//     calendar_header_year.innerHTML = year

//     let first_day = new Date (month, year , 1)

//     for(let i = 0; i <= days_of_the_month[month] + first_day.getDay()-1; i++){
//         let day = document.createElement('div')
//         if (i >= first_day.getDay()){
//             day.classList.add('calendar-day-hover')
//             day.innerHTML = i - first_day.getDay()+ 1
//             day.innerHTML +=`<span></span>
//                             <span></span>
//                             <span></span>
//                             <span></span>`
//             if(i - first_day.getDay + 1 === currDate.getDate() && year ===
//             currDate.getFullYear() && month === currDate.getMonth()){
//                 day.classList.add('curr-date')
//             }
//         }
//         calendar_days.appendChild(day)
//     }
// }

// let currDate = new Date()

// let curr_month = {value: currDate.getMonth()}
// let curr_year = {value: currDate.getFullYear()}

// generateCalendar(curr_month.value, curr_year.value) //