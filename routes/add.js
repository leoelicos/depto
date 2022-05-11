/* 
add.js

This script contains necessary code to handle routes to /api/add:

	It handles POST 	requests to /api/add/department/
	It handles POST 	requests to /api/add/role/
	It handles POST 	requests to /api/add/employee/

Copyright Leo Wong 2022
*/

// HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const OK = 200;
const CREATED = 201;
const NOTFOUND = 404;
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
		// MySQL username,
		user: 'root',
		// TODO: Add MySQL password
		password: 'xxxx',
		database: 'cms',
	},
	console.log(`Connected to the cms database.`)
);

// implement route handler for POST request to /api/add/department
add.post('/department', (req, res) => {
	//
	// check if request has a body and a name property inside the body
	if (!req.body || !req.body.name) {
		// respond to the POST request with status(BADREQUEST)
		res.status(BADREQUEST).json({
			error: err.message,
			data: req,
		});
	}

	// destructure name from the body
	const { name } = req.body;
	const sql = new SQL().addDepartment();
	const params = name;
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the POST request with status(NOTFOUND)
			res.status(NOTFOUND).json({
				error: err.message,
				data: req,
			});
		}

		// respond to the POST request with status(CREATED)
		res.status(CREATED).json({
			message: 'Successfully added',
			changes: result.affectedRows,
			data: result,
		});
	});
});

module.exports = add;
