const { Pool } = require("pg");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDKMAN",
  password: "Sarthak",  
  port: 5432,
});

module.exports = pool;
