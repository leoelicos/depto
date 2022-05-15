/*
 * Employee Management System
 * connection.js
 * This script connects to the local mysql database
 * Copyright 2022 Leo Wong
 */

// mysql2 is an npm library package which allows javascript access to an SQL database
const mysql2 = require('mysql2');

// create connection to local mysql database
const db = mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'xxxx',
	database: 'ems',
});

const disconnect = async () => db.end();

// export connection
module.exports = { db, disconnect };
