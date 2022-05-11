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
const BADREQUEST = 404;
const NOTFOUND = 404;
