function getRoles(con, func) {
    //job title, role id, the department that role belongs to, and the salary for that role
    con.promise().query(
        "SELECT roles.id, roles.title, roles.salary, departments.department FROM roles INNER JOIN departments ON roles.department_id = departments.id",
        function (err, results, fields) {
            console.table(results);
            func();
        }
    );
}
function addRole(name, salary, department, con, func) {
    con.promise().execute(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${name}", ${salary}, ${department})`,
        function (err, results, fields) {
            console.log(name + " successfully added!");
            func();
        }
    );
}

function getRolesArray(con) {
    let rolesArray = [];
    con.promise().query(
        'SELECT * FROM roles',
        function (err, results, fields) {
            for (let i = 0; i < results.length; i++) {
                rolesArray.push({ "value": results[i].id, "name": results[i].title })
            }
        }
    );
    return rolesArray;
}

module.exports = { getRoles, addRole, getRolesArray };