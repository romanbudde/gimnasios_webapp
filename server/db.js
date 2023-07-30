const { Pool } = require('pg');

const pool = new Pool({
    user: "radmin",
    password: "8RMIEw5NcniEIysFtKvwMnMZ6w3zdfr1",
    host: "dpg-cj3aladiuie55pkcfv10-a.oregon-postgres.render.com",
    port: "5432",
    database: "db_cuidadores",
    ssl: true
});

module.exports = pool;