/*
 * Employee Management System
 * updateEmployeeManager.js
 * this file contains a function that can update an employee's manager in the database
 * Copyright 2022 Leo Wong
 */

const { inquireUpdateEmployeeManager } = require('../Inquirer');

const { sqlGetEmployees, sqlUpdateEmployeeManager } = require('../mysql2');

/*
 * Function to update an employee's manager in the database
 * mysql 	> get the list of employees from the database
 * mysql 	> get the list of managers from the database
 * inquirer	> ask the user to choose the employee and the manager
 * mysql 	> update the employee's manager in the database
 */
updateEmployeeManager = async () => {
	try {
		//* mysql 	> get the list of employees from the database
		const eObjects = await sqlGetEmployees();

		// map employee names
		const eNames = eObjects.map((e) => e.first_name + ' ' + e.last_name);

		//* mysql 	> get the list of managers from the database
		const mObjects = await sqlGetEmployees();

		// map manager names
		const mNames = mObjects.map((m) => m.first_name + ' ' + m.last_name);

		//* inquirer	> ask the user to choose the employee and the manager
		const { employeeName, managerName } = await inquireUpdateEmployeeManager(eNames, mNames);

		// find employee object with employee name
		const { id: employeeId } = eObjects.find((e) => e.first_name + ' ' + e.last_name === employeeName);

		// find manager object with manager name
		let { id: managerId } = mObjects.find((m) => m.first_name + ' ' + m.last_name === managerName);

		// if chosen manager is 'none'
		if (managerName === 'none') managerId = null;

		//* mysql 	> update the employee's manager in the database
		const resolveMessage = await sqlUpdateEmployeeManager(employeeId, managerId, employeeName, managerName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { updateEmployeeManager };
