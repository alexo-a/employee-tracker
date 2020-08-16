const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { getDepartments, addDepartment, getDepartmentsArray } = require("./utils/departments.js")
const { getEmployees, getEmployeesArray, addEmployee, updateEmployee} = require("./utils/employees.js")
const { getRoles, addRole, getRolesArray } = require("./utils/roles.js")

let roleList = [];
let employeeList = [];
let deptList = []; 

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IloveLamp6969',
    database: "employees"
});

console.log("Welcome to the Employee Tracker!"); 

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    main();
})

function main() {
    roleList = getRolesArray(connection);
    employeeList = getEmployeesArray(connection);
    deptList = getDepartmentsArray(connection);
    inquirer
        .prompt(mainPrompt)
        .then((answers) => {
            if (answers.chosen === "Exit"){
                connection.end();
                console.log("Session ended. Have a nice day!");
                return
            }
            else {
                if (answers.chosen === 'View All Departments') {getDepartments(connection, main)}
                else if (answers.chosen === 'View All Roles') { getRoles(connection, main)}
                else if (answers.chosen === 'View All Employees') { getEmployees(connection, main) }
                else if (answers.chosen === 'Add a Department') {
                    queryForNewDepartment()
                    .then(answers => {
                        addDepartment(answers.newTitle, connection, main)
                    })
                }
                else if (answers.chosen === 'Add a Role') {
                    queryForNewRole()
                    .then(answers => {
                        addRole(answers.newName, answers.newSalary, answers.newDepartment, connection, main) 
                    })}
                else if (answers.chosen === 'Add an Employee') {
                    queryForNewEmployee()
                    .then(results => {
                        addEmployee(results, connection, main)
                    })
                 }
                else if (answers.chosen === 'Update an Employee Role') { 
                    queryForEmployeeRoleUpdate()
                    .then(results => {
                        updateEmployee(results,connection, main);
                    })
                }  
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

let queryForNewRole = function() {
    //deptList = getDepartmentsArray(connection);
    return inquirer.prompt(
        [
            {
                type: 'input',
                name: 'newName',
                message: 'What do you want to call the new role?',
            },
            {
                type: 'input',
                name: 'newSalary',
                message: "How much we talkin' here? ($$$)"
            },
            {
                type: 'list',
                name: 'newDepartment',
                message: "Which department are we adding this to?",
                choices: deptList
            }
        ]
    )
}

let queryForNewDepartment = function () {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'newTitle', 
            message: 'What do you want to call the new department?' 
        }
    )
}

let queryForNewEmployee = function () {
    roleList = getRolesArray(connection);
    employeeList = getEmployeesArray(connection)
    return inquirer.prompt(
        [
            {
                type: 'input',
                name: 'firstName',
                message: "What's the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What's the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What's the employee's role?",
                choices: roleList
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: employeeList,
                default: null
            },
        ]
    )
}

let queryForEmployeeRoleUpdate = function() {
    return inquirer.prompt(
        [
            {
                type: 'list',
                name: 'employeeChosen',
                message: "Choose an employee whose role you wish to change:",
                choices: employeeList
            },
            {
                type: 'list',
                name: 'newRole',
                message: "What's the employee's new role?",
                choices: roleList
            },
        ]
    )
}