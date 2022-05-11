/* 
putFetch.js

This utility file contains helper PUT fetch methods

updateEmployeeRole(employee_id, role_id)
updateEmployeeManager(employee_id, manager_id)

Copyright Leo Wong 2022
*/

const updateEmployeeRole = (employee_id, role_id) =>
	fetch('/api/employeeRole', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			employee_id: employee_id,
			role_id: role_id,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('Successful PUT request:', data);
			return data;
		})
		.catch((error) => {
			console.error('Error in PUT request:', error);
		});
