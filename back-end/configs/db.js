const { Pool } = require("pg");

const pool = new Pool({
    user: "pfe",
    host: "localhost",
    database: "pfe",
    password: "1234",
    port: 5432
});

module.exports = pool;