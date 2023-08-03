const db = require('../util/database')

module.exports = class User{
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
    }

    signUpUser() {
        return db.execute('SELECT * FROM Users WHERE Users.email = ?', [this.email])
          .then((res) => {
            if (res[0].length > 0) {
              console.log('User already exists');
              return 'User already exists';
            } else {
              return db.execute('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [this.name, this.email, this.password])
                .then(() => {
                  console.log('User inserted successfully');
                  return 'User inserted successfully';
                })
                .catch((err) => {
                  console.error('Error inserting user:', err);
                  throw err; // Rethrow the error to handle it further up the chain if needed
                });
            }
          })
          .catch((err) => {
            console.error('Error checking user:', err);
            throw err; // Rethrow the error to handle it further up the chain if needed
          });
      }
      
}