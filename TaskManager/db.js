const { Pool } = require("pg");

// Replace these values with your actual PostgreSQL credentials
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDKMAN",
  password: "Sarthak",  // Change this
  port: 5432,
});

module.exports = pool;
