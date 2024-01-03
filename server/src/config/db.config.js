const mysql = require("mysql2")
require('dotenv').config()
const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.HOST_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.HOST_PORT
})
const database = pool.promise()
module.exports=database;