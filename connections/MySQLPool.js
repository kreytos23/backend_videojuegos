const mysql = require("mysql");

const db = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "ba1c8e83e0cefe",
    password: "b83b77e8",
    database: "heroku_e2d6adb49bc0a8d",
  });

module.exports = db;