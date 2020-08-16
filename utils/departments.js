function getDepartments(con, func) {
    con.promise().query(
        'SELECT * FROM departments',
        function (err, results, fields) {
            console.table(results);
            func();
        }
    );
}

function addDepartment(newName, con, func) {
    con.promise().execute(
        `INSERT INTO departments (department) VALUES ("${newName}")`,
        function (err, results, fields) {
            console.log(newName + " successfully added!");
            func();
        }
    );
}

module.exports = {getDepartments, addDepartment};
