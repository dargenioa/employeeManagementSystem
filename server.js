const mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
cTable.getTable

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

        case "View employees by deparment":
          viewDeparment();
          break;

        case "View employees by job role":
          viewRole();
          break;

        case "Add a new employee":
          addEmployee();
          break;

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
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager_id FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;";
  connection.query(query, function (err, res) {
    console.log(res);
    console.table(res)
  });

}

const viewDeparment = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager_id FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY department.name;";
  connection.query(query, function (err, res) {
    console.log(res);
    console.table(res)
  });
}

const viewRole = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager_id FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY role.title;";
  connection.query(query, function (err, res) {
    console.log(res);
    console.table(res)
  });
}

const addEmployee = () => {
  
}
// Look up join, inner join, concat, console.table