// const db = require('../util/database');
// const bcrypt = require('bcrypt');
// const jwt= require('jsonwebtoken'); 

// module.exports = class User{
//     constructor(name,email,password){
//         this.name=name;
//         this.email=email;
//         this.password=password;
//     }

//     signUpUser() {
//         return db.execute('SELECT * FROM Users WHERE Users.email = ?', [this.email])
//           .then((res) => {
//             if (res[0].length > 0) {
//               console.log('User already exists');
//               return 'User already exists';
//             } else {
//               return db.execute('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [this.name, this.email, this.password])
//                 .then(() => {
//                   console.log('User inserted successfully');
//                   return 'User inserted successfully';
//                 })
//                 .catch((err) => {
//                   console.error('Error inserting user:', err);
//                   throw err; // Rethrow the error to handle it further up the chain if needed
//                 });
//             }
//           })
//           .catch((err) => {
//             console.error('Error checking user:', err);
//             throw err; // Rethrow the error to handle it further up the chain if needed
//           });
//       }

//       async loginUser() {
//         try {
//           const res = await db.execute('SELECT * FROM Users WHERE Users.email=?', [this.email]);
          
//           if (res[0].length == 0) {
//             return "User doesn't exist";
//           }
      
//           console.log(res[0]);
      
//           const match = await new Promise((resolve, reject) => {
//             bcrypt.compare(this.password, res[0][0].password, (err, result) => {
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(result);
//               }
//             });
//           });
      
//           if (match) {
//             return "User logged in successfully";
//           } else {
//             return "Password is incorrect";
//           }
//         } catch (err) {
//           return "Something went wrong";
//         }
//       }
      
// }

const Sequelize = require('sequelize');
const sequelize= require('../util/database');

const User = sequelize.define("Users",{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
  },
  name:Sequelize.STRING,
  email:Sequelize.STRING,
  password:Sequelize.STRING
}, {
  timestamps: false, // Disable timestamps
});

module.exports=User;