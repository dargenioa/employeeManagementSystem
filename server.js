// required node packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// establishing mysql connection
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

// startApplication will display the main menu
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

// view the table ordered by the employee's id
const viewAll = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY employee.id";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

// view the table ordered by the employee's department
const viewDeparment = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY department.name;";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

// view the table ordered by the employee's role
const viewRole = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY role.title;";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

// view the table ordered by the employee's manager
const viewManager = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY employee.manager_id DESC;";
  connection.query(query, function (err, res) {
    console.table(res)
  });
  startApplication();
}

// add a new employee by entering their first name, last name, and role_id that is linked to the title, salary and department
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

// update an employee by choosing their employee id from a list and entering the new role_id that is linked to the title, salary and department
const updateEmployee = () => {
  connection.query("SELECT * FROM employee;", function (err, results) {
    inquirer
      .prompt([
        {
          name: "id",
          type: "list",
          choices: function () {
            let firstArray = [];
            for (let i = 0; i < results.length; i++) {
              firstArray.push(results[i].id);
            }

            return firstArray;
          },
          message: "What is the employee's id?",
        },
        {
          name: "new_role",
          type: "input",
          message: "What is the new role id?",
        },
      ]).then(function (answer) {
        let chosenEmployee;
        for (let i = 0; i < results.length; i++) {
          if (results[i].id === answer.id) {
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

// update the employee's manager by using their first name and inputting the manager's name
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

// remove an employee by selecting their employee id
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

