function getEmployees(con, func) {
    con.promise().query(
        'SELECT * FROM employees',
        function (err, results, fields) {
            console.table(results);
            func();
        }
    );
}

module.exports = getEmployees;