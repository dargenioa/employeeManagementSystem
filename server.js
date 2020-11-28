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
          updateRole();
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
const roleId = [];
function updateRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err

    console.log(res);
      for (let i = 0; i < res.length; i++) {
        roleId.push(res[i].id);
      }
    })
    console.log(roleId);
  };

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
        message: "What is the employee's role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the employee's department id?"
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
          department_id: answer.department

        },
      );
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          // role_id: 

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
          name: "id",
          type: "list",
          message: "What is the employee's role.id",
          choices: function () {
            const choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(`${results[i].id}`);
            }
            return choiceArray;
          }
        },
        {
          name: "role",
          type: "input",
          message: "What is the new role?",
        },
      ]).then(function (answer) {
        // console.log({
        // first_name: answer.first,
        // last_name: answer.last,
        // title: answer.role
        // });
        connection.query("UPDATE employee SET role.title = ? WHERE ?;"
        [
          {
            title: answer.role
          }
          ,
          {
            id: answer.id

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

