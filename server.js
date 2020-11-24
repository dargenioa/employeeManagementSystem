const mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startApplication();
});

const startApplication = () => {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
  console.log(res);
  // console.table('role', [res]

  // );
});
};
