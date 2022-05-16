/*
 * Employee Management System
 * updateEmployeeRole.js
 * this file contains a function that can update an employee's role in the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the employee and the role
const inquireUpdateEmployeeRole = (employeeNames, roleTitles) =>
	inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message: primary('Update employee') + secondary("Which employee's role do you want to update?") + '\n > ',
			choices: employeeNames,
		},
		{
			name: 'roleTitle',
			type: 'list',
			message: primary('Update employee') + secondary('Which role do you want to assign the selected employee?') + '\n > ',
			choices: roleTitles,
		},
	]);

// sql to query database
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
