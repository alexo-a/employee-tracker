const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { getDepartments, addDepartment, getDepartmentsArray } = require("./utils/departments.js")
const {getEmployees, getEmployeesArray, addEmployee} = require("./utils/employees.js")
const { getRoles, addRole, getRolesArray } = require("./utils/roles.js")

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
    inquirer
        .prompt(mainPrompt)
        .then((answers) => {
            if (answers.chosen === "Exit"){
                console.log("Have a nice day!");
                connection.end();
                return
            }
            else {
                if (answers.chosen === 'View All Departments') {getDepartments(connection, main)}
                else if (answers.chosen === 'View All Roles') { getRoles(connection, main)}
                else if (answers.chosen === 'View All Employees') { getEmployees(connection, main) }
                else if (answers.chosen === 'Add a Department') {
                    queryForNewDepartment()
                    .then(answers => {
                        addDepartment(answers.newName, connection, main)
                    })
                }
                else if (answers.chosen === 'Add a Role') {
                    queryForNewRole()
                    .then(answers => {
                        addRole(answers.newName, answers.newSalary, answers.newDepartment, connection, main) 
                    })}
                else if (answers.chosen === 'Add an Employee') {
                    queryForNewEmployee().then(results => {
                        addEmployee(results, connection, main)
                    })
                 }
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
    let deptArry = getDepartmentsArray(connection);
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
                choices: deptArry
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
    let roleList = getRolesArray(connection);
    let employeeList = getEmployeesArray(connection)
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
                choices: employeeList
            },
        ]


    )
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