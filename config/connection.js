// mysql2 is an npm library package which allows javascript access to an SQL database
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'xxxx',
	database: 'ems',
});

module.exports = db;
