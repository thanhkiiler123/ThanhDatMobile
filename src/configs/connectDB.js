const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "ThanhDatMobile",
// });

const pool = mysql.createPool({
    host: "sql12.freesqldatabase.com",
    database: "sql12534782",
    user: "sql12534782",
    password: "z6KAel6pm8",
    port: "3306",
});

module.exports = pool;
