const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const roleId = [];

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

// const viewEmployees = () => {
//   connection.query("SELECT * FROM employee", function (err, res) {
//     // console.log(res);
//     console.table(res)
//   });
// }

const removeEmployee = () => {
  connection.query("DELETE FROM employee WHERE id=?", [62], function (err, res) {
    // console.log(res);
    console.table(res)
  });
}

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

// const updateRole = () => {
//   connection.query("SELECT id FROM employee", function (err, res) {
//     const roleId = [];
//     if (err) throw err
//     for (let i = 0; i < res.length; i++) {
//       let e_id = res[i];
//       roleId.push(e_id);
//     }
//   });
// };

const addEmployee = async () => {
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
        name: "department",
        type: "input",
        message: "What is the employee's department id"
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager"
      },
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
          department_id: answer.department

        },
      );
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
      viewAll();
    });
};

const updateEmployee = () => {
  connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (err, res) {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first_name",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last_name",
        },
        {
          name: "role_id",
          type: "input",
          message: "What is the new role id?",
        },
      ]).then(function (answer) {
        connection.query("UPDATE employee SET WHERE ?;"
        [
          {
            first_name: answer.first_name,
            last_name: answer.last_name
          }
        ],
          function (error) {
            if (error) throw err;
            console.log("Employee updated succesfully");
          }
        );
      });
  });
};

