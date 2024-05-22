const mysql = require("mysql");

const connectDB = mysql.createConnection({
  host: process.env.HOSTING_PORT,
  user: process.env.SERVER_OWNER,
  password: process.env.SERVER_PASSWORD,
  database: process.env.DATABASE_IDENTITY,
});

module.exports = connectDB;
