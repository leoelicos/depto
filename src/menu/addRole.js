/*
 * Employee Management System
 * addRole.js
 * this file contains a function that can add a role to the database
 * Copyright 2022 Leo Wong
 */

const { inquireAddRole } = require('../Inquirer');

const { sqlGetDepartments, sqlAddRole } = require('../mysql2');

/*
 * Function to add a role to the database
 * mysql		> get the list of departments from the database
 * inquirer > ask the user for the role's title and salary and choose the department
 * mysql 	> add the role to the database
 */

addRole = async () => {
	try {
		//* mysql		> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// map department names
		const dNames = dObjects.map((d) => d.department);

		//* inquirer > ask the user for the role's title and salary and choose the department
		const { roleTitle, roleSalary, departmentName } = await inquireAddRole(dNames);

		// find department object with department name
		const { id: departmentId } = dObjects.find((d) => d.department === departmentName);

		//* mysql 	> add the role to the database
		const resolveMessage = await sqlAddRole(roleTitle, roleSalary, departmentId);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { addRole };
