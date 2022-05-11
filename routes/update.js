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
