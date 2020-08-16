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


module.exports = getRoles;