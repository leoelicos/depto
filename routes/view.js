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

module.exports = view;
