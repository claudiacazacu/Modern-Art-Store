// db.js
const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'tw',           // numele bazei tale din pgAdmin
    user: 'postgres',         // sau alt user dacă ai setat altul
    password: 'claudia'     // parola ta de la PostgreSQL
});

module.exports = db;
