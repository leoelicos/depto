/* 
view.js

This script contains necessary code to handle routes to /api/view:

	It handles GET requests to /api/view/departments/
	It handles GET requests to /api/view/roles/
	It handles GET requests to /api/view/employees/
	It handles GET requests to /api/view/employeesByDepartment/:department_id
	It handles GET requests to /api/view/employeesByManager/:manager_id
	It handles GET requests to /api/view/totalUtilizedBudget/:department_id

Copyright Leo Wong 2022
*/

// HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const CREATED = 201;
const BADREQUEST = 400;
const NOTFOUND = 404;

// modularize route logic. This utility is exported at the end of this file.
const view = require('express').Router();

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

// implement route handler for GET request to /api/view/departments
view.get('/departments', (req, res) => {
	const sql = new SQL().viewAllDepartments();
	const params = '';
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message,
				your_sql: sql,
			});
		} else {
			// respond to the GET request with status(CREATED)
			res.status(CREATED).json({
				message: `Successfully retrieved departments`,
				result: result,
			});
		}
	});
});

// implement route handler for GET request to /api/view/roles
view.get('/roles', (req, res) => {
	const sql = new SQL().viewAllRoles();
	const params = '';
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message,
				your_sql: sql,
			});
		} else {
			// respond to the GET request with status(CREATED)
			res.status(CREATED).json({
				message: `Successfully retrieved roles`,
				result: result,
			});
		}
	});
});

// implement route handler for GET request to /api/view/employees
view.get('/employees', (req, res) => {
	const sql = new SQL().viewAllEmployees();
	const params = '';
	db.query(sql, params, (err, result) => {
		if (err) {
			// respond to the GET request with status(BADREQUEST)
			res.status(BADREQUEST).json({
				sql_error: err.message,
				your_sql: sql,
			});
		} else {
			// respond to the GET request with status(CREATED)
			res.status(CREATED).json({
				message: `Successfully retrieved employees`,
				result: result,
			});
		}
	});
});

module.exports = view;
