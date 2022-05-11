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

module.exports = del;
