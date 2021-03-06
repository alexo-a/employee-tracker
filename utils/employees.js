function getEmployees(con, func) {
    con.promise().query(
        `SELECT c.id, c.first_name, c.last_name, 
            (SELECT roles.title FROM roles WHERE c.role_id = roles.id) AS Title,
            (SELECT departments.department FROM departments, roles WHERE roles.department_id = departments.id AND c.role_id = roles.id) AS Dept,
            (SELECT roles.salary FROM roles WHERE c.role_id = roles.id) AS Salary,
            (SELECT CONCAT(b.first_name, " ", b.last_name)
            FROM employees a, employees b
            WHERE b.id = a.manager_id and c.id = a.id) as Mgr
        FROM employees c;`,
        function (err, results, fields) {
            if (err) throw err;
            console.table(results);
            func();
        }
    );
}

function getEmployeesArray(con) {
    let empArray = [];
    con.promise().query(
        'SELECT id, first_name, last_name FROM employees',
        function (err, results, fields) {
            if (err) throw err;
            for (let i = 0; i < results.length; i++) {
                empArray.push({ "value": results[i].id, "name": `${results[i].first_name} ${results[i].last_name}` })
            }
        }
    );
    return empArray;
}

function addEmployee(answersOBJ, con, func) {
    con.promise().execute(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answersOBJ.firstName}", "${answersOBJ.lastName}", ${answersOBJ.role}, ${answersOBJ.manager})`,
        function (err, results, fields) {
            if (err) throw err;
            console.log(answersOBJ.firstName + " " + answersOBJ.lastName + " successfully added!");
            func();
        }
    );
}

function updateEmployee(answersOBJ, con, func) {
    con.promise().execute(
        `UPDATE employees SET role_id = ${answersOBJ.newRole}  WHERE id = ${answersOBJ.employeeChosen}`,

        function (err, results, fields) {
            if (err) throw err;
            console.log(`Employee ${answersOBJ.employeeChosen} updated!`);
            func();
        }
    );
}

module.exports = { getEmployees, getEmployeesArray, addEmployee, updateEmployee };
