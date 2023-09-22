const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeesDB'
});

    promptUser();

function promptUser() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "What action would you like to take?",
      choices: [
        "Add Employee",
        "View Employees",
        "Delete Employees",
        "Quit"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "Add Employee":
          addEmployee();
          break;

        case "View Employees":
          viewEmployee();
          break;

          case "Delete Employees":
          deleteEmployees();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}

function addEmployee() {

    var query =
    `SELECT r.id, r.title, r.salary 
      FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roles = res.map(({ id, title, salary }) => ({
      value: id, salary: `${salary}`, title: `${title}`
    }));

    console.table(res);

    addPrompt(roles);
  });
}

function addPrompt(roles) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?"
      },
      {
        type: "list",
        name: "role_Id",
        message: "What is the role of the employee?",
        choices: roles
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_Id,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);

          promptUser();
        });
    });
}

function viewEmployee() {
  

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("You are viewing the employees!\n");

    promptUser();
  });

}

function deleteEmployees() {
  console.log("Deleting an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployee = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);

    deletePrompt(deleteEmployee);
  });
}


function deletePrompt(deleteEmployee) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_Id",
        message: "Choose an employee you would like to Delete?",
        choices: deleteEmployee
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: answer.employee_Id }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "You have deleted the employee!\n");

        promptUser();
      });
    });
}

