/* 
delete.js

This script contains necessary code to handle routes to /api/delete:

   It handles DELETE requests to /api/delete/department/
   It handles DELETE requests to /api/delete/role/
	It handles DELETE requests to /api/delete/employee/

Copyright Leo Wong 2022
*/

// HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const CREATED = 201;
const BADREQUEST = 400;
const NOTFOUND = 404;

// modularize route logic. This utility is exported at the end of this file.
const del = require('express').Router();

// import SQL class
const SQL = require('../utils/sql');

module.exports = del;
