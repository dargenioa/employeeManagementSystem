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
  inquirer
    .prompt({
      name: "viewAddChange",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View employees by deparment",
        "View employees by job role",
        "Add a new employee",
        "Add a new role",
        "Add a new department",
        "Update an existing employee"]
    })
    .then(function (answer) {
      let choice = answer.viewAddChange;
      switch (choice) {
        case "View all employees":
          viewAll();
          break;

        //   case "View employees by deparment":
        //     multiSearch();
        //     break;

        //   case "View employees by job role":
        //     rangeSearch();
        //     break;

        //   case "Add a new employee":
        //     songSearch();
        //     break;

        //   case "Add a new role":
        //     songAndAlbumSearch();
        //     break;

        //   case "Add a new department":
        //     songAndAlbumSearch();
        //     break;

        //   case "Update an existing employee":
        //     songAndAlbumSearch();
        //     break;
        //   // }
        // });
      };
    });
};

const viewAll = () => {
  let query = "SELECT * FROM employee, department, role";
  connection.query(query, function(err, res) {
    console.log(res);

  });

}

