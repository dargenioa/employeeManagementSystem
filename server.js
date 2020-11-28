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
        "Add a new employee",
        "Update an existing employee",
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

        case "Add a new employee":
          addEmployee();
          break;

        case "Update an existing employee":
          updateEmployee();
          break;

        case "Remove employee":
          removeEmployee();
          break;

      }

    });
};

const viewAll = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;";
  connection.query(query, function (err, res) {
    // console.log(res);
    console.table(res)
  });

}

const viewDeparment = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY department.name;";
  connection.query(query, function (err, res) {
    console.log(res);
    console.table(res)
  });
}

const viewRole = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY role.title;";
  connection.query(query, function (err, res) {
    console.log(res);
    console.table(res)
  });
}
const roleArray = [];
function updateRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  })
  return roleArray;
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
        type: "list",
        choices: updateRole(),
        message: "What is the employee's role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?"
      },
      {
        name: "deparment",
        type: "input",
        message: "What is the employee's department?"
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager?"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: answer.department,
        },
      );
      connection.query(
        "INSERT INTO role SET ? ",
        {
          title: answer.title,
          salary: answer.salary,

        },
      );
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
        }
      );
      viewAll();
    });
};


const updateEmployee = () => {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;";
  connection.query(query, function (err, results) {
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee would you like to select?",
          choices: function () {
            const choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(`${results[i].first_name} ${results[i].last_name}`);
            }
            return choiceArray;
          }
        },
        {
          name: "role",
          type: "list",
          choices: updateRole(),
          message: "Select the employee's new role.",
        },
      ]).then(function (answer) {
        let newRoleId = updateRole().indexOf(answer.role);
        connection.query("UPDATE employee SET ? WHERE ?", function (err, results) {
          [
            {
              name: answer.employee
            },
            {
              id: newRoleId
            }
          ],
            function (error) {
              if (error) throw err;
              console.log("Employee updated succesfully");
            }
        });
      });
  });
};

