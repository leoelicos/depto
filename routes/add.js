/* 
add.js

This script contains necessary code to handle routes to /api/add:

	It handles POST 	requests to /api/add/department/
	It handles POST 	requests to /api/add/role/
	It handles POST 	requests to /api/add/employee/

Copyright Leo Wong 2022
*/

// HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const CREATED = 201;
const BADREQUEST = 400;

// modularize route logic. This utility is exported at the end of this file.
const add = require('express').Router();

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

// implement route handler for POST request to /api/add/department
add.post('/department', (req, res) => {
	//
	// check if request has a name property inside the body
	if (!req.body || !req.body.name) {
		// respond to the POST request with status(BADREQUEST)
		res.status(BADREQUEST).json({
			error: 'body needs to have name property',
			your_body: req.body,
		});
	} else {
		// destructure name from the body
		const { name } = req.body;
		const sql = new SQL().addDepartment();
		const params = name;
		db.query(sql, params, (err, result) => {
			if (err) {
				// respond to the POST request with status(BADREQUEST)
				res.status(BADREQUEST).json({
					sql_error: err.message,
					your_sql: sql,
				});
			} else {
				// respond to the POST request with status(CREATED)
				res.status(CREATED).json({
					message: `Successfully added department '${name}'`,
					changes: result.affectedRows,
					result: result,
				});
			}
		});
	}
});

module.exports = add;
