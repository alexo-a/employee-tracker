//const express = require('express');
//const PORT = process.env.PORT || 3001;
//const app = express();
var inquirer = require('inquirer');
const connection = require('./db/database.js');
//const apiRoutes = require('./routes/apiRoutes');

const cTable = require('console.table');

/*GIVEN a command - line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, 
    view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, 
    first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that
    employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role
    and this information is updated in the database 
*/

let main = function (){
    console.log("Welcome to the Employee Tracker!");
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main-option',
                message: 'What do you want to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role'
                ],
            },
        ])
        .then(answers => {
            console.log(JSON.stringify(answers, null, '  '));
            console.table([{name: 'foo',age: 10}, {name: 'bar',age: 20}])
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log("there was an error");
            } else {
                // Something else when wrong
                console.log("there was an error");
            }
        });
}

main();
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