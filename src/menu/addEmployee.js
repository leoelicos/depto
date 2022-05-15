/*
 * Employee Management System
 * addEmployee.js
 * this file contains a function that can add an employee to the database
 * Copyright 2022 Leo Wong
 */

const { inquireAddEmployee } = require('../Inquirer');

const { sqlAddEmployee, sqlGetEmployees, sqlGetRoles } = require('../mysql2');

const { red } = require('../utils/chalkRender');

/*
 * Function to add an employee to the database
 * mysql		> get the list of roles from the database
 * mysql 	> get the list of managers from the database
 * inquirer > ask the user for the employee's name, and choose the role and the manager
 * mysql 	> add the employee to the database
 */
addEmployee = async () => {
	try {
		//* mysql		> get the list of roles from the database
		const rObjects = await sqlGetRoles();

		// map role titles
		const rTitles = rObjects.map((r) => r.title);

		//* mysql 	> get the list of managers from the database
		let mNames;
		let mObjects;
		try {
			// try to map manager names
			mObjects = await sqlGetEmployees();
			mNames = mObjects.map((m) => m.first_name + ' ' + m.last_name);
		} catch (err) {
			// no employees in current database
			if (err === red('No employees found')) {
				mNames = [];
			}
		}

		//* inquirer > ask the user for the employee's name, and choose the role and the manager
		const { firstName, lastName, roleTitle, managerName } = await inquireAddEmployee(rTitles, mNames);

		// find role object with role title
		const { id: roleId } = rObjects.find((r) => r.title === roleTitle);

		// find manager object with manager name
		let { id: managerId } = mObjects.find((m) => m.first_name + ' ' + m.last_name === managerName);

		// if chosen manager is 'none'
		if (managerName === 'none') managerId = null;

		//* mysql 	> add the employee to the database
		const resolveMessage = await sqlAddEmployee(firstName, lastName, roleId, managerId);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { addEmployee };
