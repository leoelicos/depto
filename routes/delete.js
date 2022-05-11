/* 
delete.js

This script contains necessary code to handle routes to /api/delete:

   It handles DELETE requests to /api/delete/department/:id
   It handles DELETE requests to /api/delete/role/:id
	It handles DELETE requests to /api/delete/employee/:id

Copyright Leo Wong 2022
*/

// HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const OK = 200;
const BADREQUEST = 400;
const NOTFOUND = 404;

// modularize route logic. This utility is exported at the end of this file.
const del = require('express').Router();

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

// implement route handler for DELETE request to /api/delete/department/:id
del.delete('/department/:id', (req, res) => {
	const sql = new SQL().deleteDepartment();
	const id = req.params.id;
	const params = id;
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message,
				your_sql: sql,
			});
		} else {
			if (result.affectedRows === 0) {
				// respond to the GET request with status(NOTFOUND)
				res.status(NOTFOUND).json({
					message: `Couldn't find department ${id}`,
					result: result,
				});
			} else {
				// respond to the GET request with status(CREATED)
				res.status(OK).json({
					message: `Successfully deleted department ${id}`,
					changes: result.changedRows,
					result: result,
				});
			}
		}
	});
});

// implement route handler for DELETE request to /api/delete/role/:id
del.delete('/role/:id', (req, res) => {
	const sql = new SQL().deleteRole();
	const id = req.params.id;
	const params = id;
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message,
				your_sql: sql,
			});
		} else {
			if (result.affectedRows === 0) {
				// respond to the GET request with status(NOTFOUND)
				res.status(NOTFOUND).json({
					message: `Couldn't find role ${id}`,
					result: result,
				});
			} else {
				// respond to the GET request with status(CREATED)
				res.status(OK).json({
					message: `Successfully deleted role ${id}`,
					changes: result.changedRows,
					result: result,
				});
			}
		}
	});
});

// implement route handler for DELETE request to /api/delete/employee/:id
del.delete('/employee/:id', (req, res) => {
	const sql = new SQL().deleteEmployee();
	const id = req.params.id;
	const params = id;
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message,
				your_sql: sql,
			});
		} else {
			if (result.affectedRows === 0) {
				// respond to the GET request with status(NOTFOUND)
				res.status(NOTFOUND).json({
					message: `Couldn't find employee ${id}`,
					result: result,
				});
			} else {
				// respond to the GET request with status(CREATED)
				res.status(OK).json({
					message: `Successfully deleted employee ${id}`,
					changes: result.changedRows,
					result: result,
				});
			}
		}
	});
});

module.exports = del;
