/* 
getFetch.js

This utility file contains helper GET fetch functions

Copyright Leo Wong 2022
*/

const getDepartments = () =>
	fetch('/api/view/departments', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);

const getRoles = () =>
	fetch('/api/view/roles', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);

const getEmployees = () =>
	fetch('/api/view/employees', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);

const getEmployeesByDepartment = (department_id) =>
	fetch(`/api/view/employeesByDepartment/${department_id}`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);

const getEmployeesByManager = (manager_id) =>
	fetch(`/api/view/employeesByManager/${manager_id}`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);

const getTotalUtilizedBudget = (department_id) =>
	fetch(`/api/view/totalUtilizedBudget/${department_id}`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);
