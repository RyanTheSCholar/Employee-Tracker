const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const table = require("console.table");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootRoot",
    database: "employees_db",
  },
  console.log(`Connected to the employee_db database.`)
);

const mainQuestion = {
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
    "Quit",
  ],
  loop: false,
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
const viewAllEmployees = () => {
  db.query(`SELECT * FROM employees`, (err, results) => {
   err ? console.error(err) : console.table(results);
    init();
  });
};
const viewAllRoles = () => {
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    init();
  });
};
const viewAllDepartments = () => {
  db.query(`SELECT * FROM departments`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    init();
  });
};
const addDepartment = () => {
  inquirer.prompt(departmentQuestions).then((response) => {
    db.query(`INSERT INTO department(name) VALUES(?)`, response.addDepartment, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        db.query(`SELECT * FROM department`, (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.table(results);
          }
          init();
        });
      }
    });
  });
};
const addRole = () => {
  inquirer.prompt(roleQuestions).then(
    db.promise().query("INSERT INTO role", (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  );
};
const addEmployee = () => {
  inquirer.prompt(roleQuestions).then(
    db.query("INSERT INTO employee", (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
    })
  );
};

const init = () => {
  inquirer
    .prompt(mainQuestion)
    .then((response) => {
      if (response.initialize === "View All Employees") {
        return viewAllEmployees();
      }
      if (response.initialize === "View All Roles") {
        viewAllRoles();
      }
      if (response.initialize === "View All Departments") {
        viewAllDepartments();
      }
      if (response.initialize === "Add Role") {
        addRole();
      }
      if (response.initialize === "Add Employee") {
        addEmployee();
      }
      if (response.initialize === "Add department") {
        addDepartment();
      }
      if (response.initialize === "Quit") {
        console.log("Have a good day!");
        process.exit();
      }
    })
    .catch((err) => console.error(err));
};
init();
