/* 
add.js

This script contains necessary code to handle routes to /api/add:

	It handles POST 	requests to /api/add/department/
	It handles POST 	requests to /api/add/role/
	It handles POST 	requests to /api/add/employee/

Copyright Leo Wong 2022
*/

// modularize route logic. This utility is exported at the end of this file.
const add = require('express').Router();

// implement middleware for parsing JSON
app.use(express.json());

// implement middleware for parsing urlencoded form data
app.use(express.urlencoded({ extended: false }));

module.exports = add;
