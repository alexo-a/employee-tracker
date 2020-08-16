const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IloveLamp6969',
    database: "employees"
});

const cTable = require('console.table');
const getDepartments = require("./utils/departments.js")
const getEmployees = require("./utils/employees.js")
const getRoles = require("./utils/roles.js")
/*GIVEN a command - line application that accepts user input

[x]WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

[]WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

[]WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, 
    first names, last names, job titles, departments, salaries, and managers that the employees report to

[]WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

[]WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

[]WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that
    employee is added to the database

[]WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role
    and this information is updated in the database
*/
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    main();
})


let mainPrompt = {
    type: 'list',
    name: 'chosen',
    message: 'What do you want to do?',
    choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
    ],
    loop: false
};
console.log("Welcome to the Employee Tracker!");

function inquirerPrompt(){
    return inquirer
        .prompt(mainPrompt)
}   

function main() {
    inquirerPrompt()
        .then((answers) => {
            if (answers.chosen === "Exit"){
                console.log("Have a nice day!");
                connection.end();
                return
            }
            else {
                if (answers.chosen === 'View All Departments'){getDepartments(connection, main)}
                else if (answers.chosen === 'View All Roles') { getRoles(connection, main)}
                else if (answers.chosen === 'View All Employees') { getEmployees(connection, main) }
                else if (answers.chosen === 'Add a Department') { }
                else if (answers.chosen === 'Add a Role') { }
                else if (answers.chosen === 'Add an Employee') { }
                else if (answers.chosen === 'Update an Employee Role') { }  
            }   
        })       
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log("there was an error");
            } else {
                // Something else when wrong
                console.log("there was an error2");
            }
        }); 
}



/* // Default response for any other requests(Not Found) Catch all
app.use((req, res) => {
    console.log("err");
    res.status(404).end();
});

// Start server after DB connection
connection.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}); */