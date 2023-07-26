const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const table = require("console.table");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "665752",
    database: "employees_db",
  },
  console.log(`Connected to the employee_db database.`)
);

const mainQuestion = 
  {
    name: "initialize",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employees",
      "Update Employee role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit"
    ],
    loop: false
  };
const employeeQuestions = [
  {
    name: "firstName",
    message: "What is employee's first name?",
    type: "input",
  },
  {
    name: "lastName",
    message: "What is employee's last name?",
    type: "input",
  },
  {
    name: "employeeRole",
    message: "What is the employee's role?",
    choices: [],
  },
];
const departmentQuestions = [
  {
    name: "addDepartment",
    message: "What is the name of the department?",
    type: "input",
  },
];
const roleQuestions = [
  {
    name: "nameOfRole",
    message: "What is the name of the role?",
    type: "input",
  },
  {
    name: "Salary",
    message: "What is the salary of the role?",
    type: "input",
  },
  {
    name: "departmentOfRole",
    message: "Which department does the role belong to?",
    type: "input",
  },
];
function viewEmployee() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
  });
}
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
  });
}
function viewDepartment() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
  });
}

function addRole() {
  inquirer.prompt(roleQuestions).then(
    db.query("INSERT INTO role", function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
    })
  );
}
function addDepartment() {
  inquirer.prompt(departmentQuestions).then(
    db.query("INSERT INTO department", function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
    })
  );
}

inquirer.prompt(mainQuestion).then((response) => {
  console.log(response)
  if (response.initialize === "View All Employees") {
    viewEmployee();
  } else if (response.initialize === "Add Role") {
    addRole();
  } else if (response.initialize === "Add department") {
    addDepartment();
  }
});