/*
 * Employee Management System
 * addDepartment.js
 * this file contains a function that can
 * Copyright 2022 Leo Wong
 */

const { inquireAddDepartment } = require('../Inquirer');

const { sqlAddDepartment } = require('../mysql2');

/*
 * Function to add a department to the database
 * inquirer	> ask the user for the department's name
 * mysql 	> add the department to the database
 */
addDepartment = async () => {
	try {
		//* inquirer	> ask the user for the department's name
		const { departmentName } = await inquireAddDepartment();

		//* mysql 	> add the department to the database
		const resolveMessage = await sqlAddDepartment(departmentName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { addDepartment };
