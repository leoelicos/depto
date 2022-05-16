/*
 * Employee Management System
 * connection.js
 * This script connects to the local mysql database
 * Copyright 2022 Leo Wong
 */

// mysql2 is an npm library package which allows javascript access to an SQL database
const db = require('mysql2').createConnection(
	// database location
	{
		host: 'localhost',
		user: 'root',
		password: 'xxxx',
		database: 'ems',
	}
);

const disconnect = async () => db.end();

// export connection
module.exports = { db, disconnect };
