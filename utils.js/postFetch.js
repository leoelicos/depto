/* 
postFetch.js

This utility file contains helper POST fetch methods

addDepartment(name)
addRole(title, salary, department_id)
addEmployee(first_name, last_name, role_id, manager_id)

Copyright Leo Wong 2022
*/

const addDepartment = (name) =>
	fetch('/api/department', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('Successful POST request:', data);
			return data;
		})
		.catch((error) => {
			console.error('Error in POST request:', error);
		});
