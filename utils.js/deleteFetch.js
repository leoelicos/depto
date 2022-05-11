/* 
deleteFetch.js

This utility file contains helper DELETE fetch methods

deleteDepartment(department_id)
deleteRole(role_id)
deleteEmployee(employee_id)

Copyright Leo Wong 2022
*/

const deleteDepartment = (department_id) =>
	fetch(`/api/department/${department_id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('Successful DELETE request:', data);
			return data;
		})
		.catch((error) => {
			console.error('Error in DELETE request:', error);
		});

const deleteRole = (role_id) =>
	fetch(`/api/role/${role_id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('Successful DELETE request:', data);
			return data;
		})
		.catch((error) => {
			console.error('Error in DELETE request:', error);
		});
