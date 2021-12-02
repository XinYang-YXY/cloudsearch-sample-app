require('dotenv').config();
const mysql = require('mysql2/promise');

const { host, port, user, password, database } = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
async function initialize() {
  // create db if it doesn't already exist
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  process.exit(0);
}

initialize();