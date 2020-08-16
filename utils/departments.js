function getDepartments(con, func) {
    con.promise().query(
        'SELECT * FROM departments',
        function (err, results, fields) {
            console.table(results);
            func();
        }
    );
}
function getDepartmentsArray(con) {
    let results2 = [];
    con.promise().query(
        'SELECT * FROM departments',
        function (err, results, fields) {
            for (let i = 0; i < results.length; i++) {
                results2.push({ "value": results[i].id, "name": results[i].department })
            }
        }
    );
    return results2;
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

module.exports = { getDepartments, addDepartment, getDepartmentsArray};
