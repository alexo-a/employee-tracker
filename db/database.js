const mysql = require('mysql').verbose();

// Connect to database
const db = new mysql.Database('./db/employees.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the employees database.');
});

module.exports = db;