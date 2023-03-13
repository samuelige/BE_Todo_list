const { Pool } = require("pg");
const development = require("./dbConfig");

const {username, password, host, port, database} = development;
const pool = new Pool({
  user: username,
  host,
  database,
  password,
  port,
})

module.exports = pool;


