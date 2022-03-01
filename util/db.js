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

    }

};
