require("dotenv").config();
const Sequelize = require("sequelize");

// Initialize DB configuration with Sequelize
// https://sequelize.org/
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mysql",
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.subscribers = require("./subscriber.model.js")(sequelize, Sequelize);

module.exports = db;
