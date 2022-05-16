/*
 * Employee Management System
 * printEmployees.js
 * this file contains a function that can print all employees from the database
 * Copyright 2022 Leo Wong
 */

// sql to query database
const { sqlGetEmployees } = require('../mysql2');

/*
 * Function to print all employees from the database
 * mysql 	> get the list of employees from the database
 */
printEmployees = async () => {
	try {
		//* mysql 	> get the list of employees from the database
		const eObjects = await sqlGetEmployees();

		// log view title
		console.log('\nTable: All employees');

		// log view
		console.table(eObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printEmployees };
