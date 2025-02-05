const Sequelize = require("sequelize");

require("dotenv").config();

let sequelize;

// JAWSDB
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // SQL config
  sequelize = new Sequelize(
    process.env.DATA_NAME,
    process.env.DATA_USER,
    process.env.DATA_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
module.exports = sequelize;
