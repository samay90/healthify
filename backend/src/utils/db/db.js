const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    database: process.env.MYSQL_DB_NAME,
    password: process.env.MYSQL_DB_PASSWORD,
    user: process.env.MYSQL_DB_USER,
    host: process.env.MYSQL_DB_HOST,
    port: Number(process.env.MYSQL_DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
});

async function waitForDb(retries = 12, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            await new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if (err) return reject(err);
                    connection.release();
                    resolve();
                });
            });
            console.log("Connected to the database");
            return;
        } catch (err) {
            console.error(`Database connection attempt ${i + 1} failed: ${err.code || err}. Retrying in ${delay}ms`);
            await new Promise((r) => setTimeout(r, delay));
        }
    }
    console.error(`Unable to connect to database after ${retries} attempts. Exiting.`);
    process.exit(1);
}

waitForDb();

module.exports = db;