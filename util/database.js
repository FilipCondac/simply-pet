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

    checkIfUserExists: (username, password, request, response) => {
      db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.username = username;
          // Redirect to home page
          response.redirect('/home');
        } else {
          response.send('Incorrect Username and/or Password!');
        }			
       return response.end();
      });
    }



};
