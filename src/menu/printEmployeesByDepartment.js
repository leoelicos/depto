/*
 * Employee Management System
 * printEmployeesByDepartment.js
 * this file contains a function that can print the employees from a specific department from the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the department for which to print the employees
const inquireViewEmployeesByDepartment = (departmentNames) =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'list',
			message: primary('View employees') + secondary("Which department's employees do you want to view?" + '\n > '),
			choices: departmentNames,
		},
	]);

// sql to query database
const { sqlGetDepartments, sqlGetEmployeesByDepartment } = require('../mysql2');

/*
 * Function to print the employees from a specific department from the database
 * mysql 	> get the list of departments from the database
 * inquirer	> ask the user to choose the department for which to print the employees
 * mysql 	> get the employees from that specific department from the database
 */
printEmployeesByDepartment = async () => {
	try {
		//* mysql 	> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// map department names
		const dNames = dObjects.map((d) => d.department);

		//* inquirer	> ask the user to choose the department for which to print the employees
		const { departmentName } = await inquireViewEmployeesByDepartment(dNames);

		// find department object with department name
		const { id: departmentId } = dObjects.find((d) => d.department === departmentName);

		//* mysql 	> get the employees from that specific department from the database
		const eObjects = await sqlGetEmployeesByDepartment(departmentId, departmentName);

		// log view title
		console.log(`\nTable: Employees in ${departmentName}`);

		// log view
		console.table(eObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { printEmployeesByDepartment };
