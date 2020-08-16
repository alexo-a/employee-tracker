const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const connection = require('./db/database');
//const apiRoutes = require('./routes/apiRoutes');
const cTable = require('console.table');




// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use('/api', apiRoutes);

// Default response for any other requests(Not Found) Catch all
app.use((req, res) => {
    console.log("err");
    res.status(404).end();
});

// Start server after DB connection
connection.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});