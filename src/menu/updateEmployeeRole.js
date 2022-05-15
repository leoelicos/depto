/*
 * Employee Management System
 * updateEmployeeRole.js
 * this file contains a function that can update an employee's role in the database
 * Copyright 2022 Leo Wong
 */

const { inquireUpdateEmployeeRole } = require('../Inquirer');

const { sqlGetEmployees, sqlGetRoles, sqlUpdateEmployeeRole } = require('../mysql2');

/*
 * Function to update an employee's role in the database
 * mysql 	> get the list of employees from database
 * mysql 	> get the list of roles from database
 * inquirer	> ask the user to choose the employee and the role
 * mysql 	> update the employee's role in the database
 */
updateEmployeeRole = async () => {
	try {
		//* mysql 	> get the list of employees from database
		const eObjects = await sqlGetEmployees();

		// map employee names
		const eNames = eObjects.map((e) => e.first_name + ' ' + e.last_name);

		//* mysql 	> get the list of roles from database
		const rObjects = await sqlGetRoles();

		// map role titles
		const rTitles = rObjects.map((r) => r.title);

		//* inquirer	> ask the user to choose the employee and the role
		const { employeeName, roleTitle } = await inquireUpdateEmployeeRole(eNames, rTitles);

		// find employee object with employee name
		const { id: employeeId } = eObjects.find((e) => e.first_name + ' ' + e.last_name === employeeName);

		// find role object with role name
		const { id: roleId } = rObjects.find((r) => r.title === roleTitle);

		//* mysql 	> update the employee's role in the database
		const resolveMessage = await sqlUpdateEmployeeRole(employeeId, roleId, employeeName, roleTitle);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { updateEmployeeRole };
