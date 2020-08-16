function getDepartments(con, func) {
    con.promise().query(
        'SELECT * FROM departments',
        function (err, results, fields) {
            console.table(results);
            func();
        }
    );
}

module.exports = getDepartments;