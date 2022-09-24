let mysql = require('mysql');

let dbName = 'nodejs_api';

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pass: '',
    database: dbName
})

conn.connect((err) => {
    if (err) throw err;
    console.log(`200 : Connect to Database name --> "${dbName}" Success`);
})


module.exports = conn;