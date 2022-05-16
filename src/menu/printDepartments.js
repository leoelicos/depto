/*
 * Employee Management System
 * printDepartments.js
 * this file contains a function that can print all departments from the database
 * Copyright 2022 Leo Wong
 */

// sql to query database
const { sqlGetDepartments } = require('../mysql2');

/*
 * Function to print all departments from the database
 * mysql 	> get the list of departments from the database
 */
printDepartments = async () => {
	try {
		//* mysql 	> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// log view title
		console.log('\nTable: All Departments');

		// log view
		console.table(dObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { printDepartments };
