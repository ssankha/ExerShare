
const mysql = require('mysql');
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
});

connection.connect(function(err) {
    // console.log(`${process.env.DB_HOST}
    //     ${process.env.DB_USER}
    //     ${process.env.DB_DATABASE}
    //     ${process.env.DB_PASS}`);
if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
}
console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;