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

// implement middleware for parsing JSON
app.use(express.json());

// implement middleware for parsing urlencoded form data
app.use(express.urlencoded({ extended: false }));

module.exports = add;
