const {
  response
} = require("express");
const e = require("express");

module.exports = {
  createUser: () => {
    return 'Jim';
  },

  getUserByID: (id) => {
    db.query("SELECT * FROM Users WHERE id = " + id, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    });
  },

  functionName: (user, stuff) => {

  },

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

  createUser: (email, username, password) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO accounts (username,password,email) VALUES (?,?,?)', [username, password, email], (error, results) => {
        if (error) {
          return reject(error)
        }
        return resolve(false);
      });
     
    })
    
  }

};