/*
 * Employee Management System
 * printRoles.js
 * this file contains a function that can print all roles from the database
 * Copyright 2022 Leo Wong
 */

// sql to query database
const { sqlGetRoles } = require('../mysql2');

/*
 * Function to print all roles from the database
 * mysql 	> get the list of roles from the database
 */

printRoles = async () => {
	try {
		//* mysql 	> get the list of roles from the database
		const rObjects = await sqlGetRoles();

		// log view title
		console.log('\nTable: All Roles');

		// log view
		console.table(rObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printRoles };
