const { Pool } = require("pg");

const pool = new Pool({
    user: "TAL_USER",
    host: "localhost",
    database: "TAL_DB",
    password: "1234",
    port: 5432
});

module.exports = pool;