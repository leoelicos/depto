/*
 * Employee Management System
 * printEmployeesByManager.js
 * this file contains a function that can print the employees with a specific manager from the database
 * Copyright 2022 Leo Wong
 */

const { inquireViewEmployeesByManager } = require('../Inquirer');

const { sqlGetManagers, sqlGetEmployeesByManager } = require('../mysql2');

/*
 * Function to print the employees with a specific manager from the database
 * mysql 	> get the list of managers from the database
 * inquirer	> ask the user to choose the manager for which to print the employees
 * mysql 	> get the employees with that specific manager from the database
 */
printEmployeesByManager = async () => {
	try {
		//* mysql 	> get the list of managers from the database
		const mObjects = await sqlGetManagers();

		// map manager names
		const mNames = mObjects.map((m) => m.first_name + ' ' + m.last_name);

		//* inquirer	> ask the user to choose the manager for which to print the employees
		const { managerName } = await inquireViewEmployeesByManager(mNames);

		// find manager object with manager name
		const { id: managerId } = mObjects.find((m) => m.first_name + ' ' + m.last_name === managerName);

		//* mysql 	> get the employees with that specific manager from the database
		const eObjects = await sqlGetEmployeesByManager(managerId, managerName);

		// log view title
		console.log(`\nTable: ${managerName}'s team`);

		// log view
		console.table(eObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printEmployeesByManager };
