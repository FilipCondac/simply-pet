const {
  response
} = require("express");
const e = require("express");

module.exports = {
  
  checkIfUserExists: (email, password) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], (error, results) => {
        // If there is an issue with the query, output the error
        if (error) reject(error);
        // If the account exists
        if (results.length > 0) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
    })
  },

   //Input user information into database for express to check against
  createUser: (email, username, password) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO accounts (username,password,email) VALUES (?,?,?)', [username, password, email], (error, results) => {
        if (error) {
          return reject(error)
        }
        return resolve(true);
      });
     
    })
    
  },

 //Input pet info into database based on express session email
  createPet: (petName, petAge, petType, petBreed, petVaccinated , petLastApp, petVetPractice, petVetName, email) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO pets (petName, petAge, petType, petBreed, petVaccinated , petLastApp, petVetPractice, petVetName, email) VALUES (?,?,?,?,?,?,?,?,?)', 
      [petName, petAge, petType, petBreed, petVaccinated , petLastApp, petVetPractice, petVetName, email], (error, results)=>{
        if (error) {
          return reject(error);
        }
        return resolve(true);
      });
    })
  },

  //Return the pets that match session email
  getPet: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM pets WHERE email = ?', [email], (error, results) =>{
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

   //Input user created appointments into DB
  createAppointment : (appointmentDate, appointmentFirstName, appointmentLastName, appointmentNumber, appointmentIssue, appointmentDescription, petName, email) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO appointments (appointmentDate, appointmentFirstName, appointmentLastName, appointmentNumber, appointmentIssue, appointmentDescription, name, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
      [appointmentDate, appointmentFirstName, appointmentLastName, appointmentNumber, appointmentIssue, appointmentDescription, petName, email], (error,results) => {
        if(error){
          return reject(error);
        }
        return resolve(true);
      });
    })
  }

};