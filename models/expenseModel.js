// const db = require('../util/database');


// module.exports=class DailyExpense{
//     constructor(id,amount,description,category){
//         this.id=id;
//         this.amount=amount;
//         this.description=description;
//         this.category=category;
//     }
//     addExpense(){
//         return db.execute('INSERT INTO expenses(amount,description,category) VALUES (?,?,?)',[this.amount,this.description,this.category]).then((res)=>{
//             return res;
//         }).catch((err)=>{
//             throw(err);
//         })
//     }
//     static getAllExpense(){
//         return db.execute('SELECT * FROM expenses').then((res)=>{
//             return res[0];
//         }).catch((err)=>{
//             throw(err);
//         })
//     }

//     deleteExpense(){
//         console.log('model delte',this.id);
//         return db.execute('DELETE FROM expenses WHERE id=?',[this.id]).then((res)=>{return "deleted"}).catch((err)=>{
//             throw(err);
//         })
//     }
// }

const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const Expenses = sequelize.define("expense", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: false, // Disable timestamps
});
module.exports = Expenses;