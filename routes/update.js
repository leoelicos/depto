/* 
update.js

This script contains necessary code to handle routes to /api/update:

	It handles PUT requests to /api/update/employeeRole/
	It handles PUT requests to /api/update/employeeManager/

Copyright Leo Wong 2022
*/

// HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const CREATED = 201;
const BADREQUEST = 400;
const NOTFOUND = 404;

// modularize route logic. This utility is exported at the end of this file.
const update = require('express').Router();

// import SQL class
const SQL = require('../utils/sql');

// mysql2 is an npm library package which allows javascript access to an SQL database
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'xxxx',
		database: 'cms',
	},
	console.log(`Connected to the cms database.`)
);

// implement route handler for PUT request to /api/update/employeeRole/
update.put('/employeeRole/', (req, res) => {
	const sql = new SQL().updateEmployeeRole();
	const { role_id, employee_id } = req.body;
	const params = [role_id, employee_id];
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message + 'hello',
				your_sql: sql,
			});
		} else {
			if (result.affectedRows === 0) {
				// respond to the GET request with status(NOTFOUND)
				res.status(NOTFOUND).json({
					message: `Couldn't find employee ${employee_id} or role ${role_id}`,
					result: result,
				});
			} else {
				// respond to the GET request with status(CREATED)
				res.status(CREATED).json({
					message: `Successfully changed employee ${employee_id} role to ${role_id}`,
					changes: result.changedRows,
					result: result,
				});
			}
		}
	});
});

// implement route handler for PUT request to /api/update/employeeManager/
update.put('/employeeManager/', (req, res) => {
	const sql = new SQL().updateEmployeeManager();
	const { manager_id, employee_id } = req.body;
	const params = [manager_id, employee_id];
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message + 'hello',
				your_sql: sql,
			});
		} else {
			if (result.affectedRows === 0) {
				// respond to the GET request with status(NOTFOUND)
				res.status(NOTFOUND).json({
					message: `Couldn't find employee ${employee_id} or manager ${manager_id}`,
					result: result,
				});
			} else {
				// respond to the GET request with status(CREATED)
				res.status(CREATED).json({
					message: `Successfully changed employee ${employee_id} manager to ${manager_id}`,
					result: result,
				});
			}
		}
	});
});

module.exports = update;
