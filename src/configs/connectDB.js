const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "ThanhDatMobile",
// });

const pool = mysql.createPool({
    host: "buxpviafyttqy6i8ye78-mysql.services.clever-cloud.com",
    user: "uucgkid0kbwed9rj",
    database: "buxpviafyttqy6i8ye78",
    password: "uucgkid0kbwed9rj",
    port: "3306",
});


module.exports = pool;
