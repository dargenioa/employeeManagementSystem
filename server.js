const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
        "View employees by manager",
        "Add a new employee",
        "Update an existing employee's role",
        "Update an existing employee's manager",
        "Remove employee"
      ]
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

        case "View employees by manager":
          viewManager();
          break;

        case "Add a new employee":
          addEmployee();
          break;

        case "Update an existing employee's role":
          updateEmployee();
          break;

        case "Update an existing employee's manager":
          updateManager();
          break;

        case "Remove employee":
          removeEmployee();
          break;

      }

    });
};

const viewAll = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY employee.id";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

const viewDeparment = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY department.name;";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

const viewRole = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY role.title;";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

const viewManager = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY employee.manager_id DESC;";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "title",
        type: "input",
        message: "What is the employee's role id?"
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager"
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.title,
          manager_id: answer.manager

        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
        }
      );
      startApplication();
    });
};

const updateEmployee = () => {
  connection.query("SELECT * FROM employee;", function (err, results) {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "list",
          choices: function () {
            let firstArray = [];
            for (let i = 0; i < results.length; i++) {
              firstArray.push(results[i].first_name);
            }

            return firstArray;
          },
          message: "What is the employee's first name?",
        },
        {
          name: "new_role",
          type: "input",
          message: "What is the new role id?",
        },
      ]).then(function (answer) {
        let chosenEmployee;
        for (let i = 0; i < results.length; i++) {
          if (results[i].first_name === answer.first_name) {
            chosenEmployee = results[i];
          }
        }
        connection.query("UPDATE employee SET ? WHERE ?;",
          [{

            role_id: answer.new_role,

          },

          {

            id: chosenEmployee.id,

          }],
          function (error) {
            if (error) throw err;
            console.log("Employee updated succesfully");
          });
        startApplication();
      });
  });
};

const updateManager = () => {
  connection.query("SELECT * FROM employee;", function (err, results) {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "list",
          choices: function () {
            let firstArray = [];
            for (let i = 0; i < results.length; i++) {
              firstArray.push(results[i].first_name);
            }

            return firstArray;
          },
          message: "What is the employee's first name?",
        },
        {
          name: "manager_id",
          type: "input",
          message: "Who is the employee's manager?",
        },
      ]).then(function (answer) {
        let chosenEmployee;
        for (let i = 0; i < results.length; i++) {
          if (results[i].first_name === answer.first_name) {
            chosenEmployee = results[i];
          }
        }
        connection.query("UPDATE employee SET ? WHERE ?;",
          [{

            manager_id: answer.manager_id,

          },

          {

            id: chosenEmployee.id,

          }],
          function (error) {
            if (error) throw err;
            console.log("Employee updated succesfully");
          });
        startApplication();
      });
  });
};

const removeEmployee = () => {
  connection.query("SELECT * FROM employee;", function (err, results) {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "Enter the employee id of the employee you would like to remove."
        },
      ]).then(function (answer) {
        connection.query("DELETE FROM employee WHERE id=?", [answer.id], function (err, res) {
          console.log(res);
        });
        startApplication();
      });
  });
};

