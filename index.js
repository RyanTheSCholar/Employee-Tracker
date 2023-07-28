const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootRoot",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);
const mainQuestion = {
  name: "initialize",
  type: "list",
  message: "What would you like to do?",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Quit",
  ],
  loop: false,
};
// const departmentQuestions = [
//   {
//     name: "addDepartment",
//     message: "What is the name of the department?",
//     type: "input",
//   },
// ];
// const roleQuestions = [
//   {
//     name: "nameOfRole",
//     message: "What is the name of the role?",
//     type: "input",
//   },
//   {
//     name: "Salary",
//     message: "What is the salary of the role?",
//     type: "input",
//   },
//   {
//     name: "departmentOfRole",
//     message: "Which department does the role belong to?",
//     type: "input",
//   },
// ];
const viewAllEmployees = () => {
  console.log(db);
  // SHOWS Table
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, 
  department.name AS department, role.salary,
   CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee manager on manager.id = employee.manager_id`,
    (err, results) => {
      if (err) {
        console.error(err);
      }
      console.table(results);
      init();
    }
  );
};

const viewAllRoles = () => {
  db.query(`SELECT * FROM role `, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);

    init();
  });
};
const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    init();
  });
};
const addDepartment = () => {
  const departmentQuestions = [
    {
      name: "addDepartment",
      message: "What is the name of the department?",
      type: "input",
    },
  ];
  inquirer.prompt(departmentQuestions).then((response) => {
    db.query(
      `INSERT INTO department(name) VALUES(?)`,
      response.addDepartment,
      (err, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added ${response.addDepartment}`);
        }
      }
    );
    init();
  });
};
const addRole = () => {
  const department = [];
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) {
      console.log(err);
    }
    results.forEach((dept) => {
      let newDept = {
        name: dept.name,
        value: dept.id,
      };
      department.push(newDept);
    });
  });
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
      type: "list",
      choices: department,
    },
  ];
  inquirer.prompt(roleQuestions).then((response) => {
    db.query(
      `INSERT INTO role(title, salary, department_id) VALUES(?)`,
      [response.title, response.salary, response.department_id],
      (err, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added ${response.title}`);
        }
        init();
      }
    );
  });
};
const addEmployee = () => {
  const roles = [];
  const managers = [];
  db.query(`SELECT * FROM employee`, (err, results) => {
    if (err) {
      console.log(err);
    }
    results.forEach((role) => {
      let manager = {
        name: role.first_name + " " + role.last_name,
        value: role.id,
      };
      managers.push(manager);
    });
  });
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
    }
    results.forEach((role) => {
      let newRole = {
        name: role.title,
        value: role.id,
      };
      roles.push(newRole);
    });
    const employeeQuestions = [
      {
        name: "first_name",
        message: "What is employee's first name?",
        type: "input",
      },
      {
        name: "last_name",
        message: "What is employee's last name?",
        type: "input",
      },
      {
        name: "employeeRole",
        message: "What is the employee's role?",
        type: "list",
        choices: roles,
      },
      {
        name: "manager",
        message: "Who is there manager?",
        type: "list",
        choices: managers,
      },
    ];
    inquirer.prompt(employeeQuestions).then((response) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?)`,
        [
          response.first_name,
          response.last_name,
          response.employeeRole,
          response.manager,
        ],
        (err, response) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Added ${response.first_name} ${response.last_name}`);
          }
          init();
        }
      );
    });
  });
};

const init = () => {
  inquirer
    .prompt(mainQuestion)
    .then((response) => {
      if (response.initialize === "View All Employees") {
        viewAllEmployees();
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
      if (response.initialize === "Add Department") {
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
