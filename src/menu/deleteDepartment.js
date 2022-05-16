/*
 * Employee Management System
 * deleteDepartment.js
 * this file contains a function that can delete a department from the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the department to delete
const inquireDeleteDepartment = (departmentNames) =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'list',
			message: primary('Delete department') + secondary('Which department do you want to delete?') + '\n > ',
			choices: departmentNames,
		},
	]);

// sql to query database
const { sqlGetDepartments, sqlDeleteDepartment } = require('../mysql2');

/*
 * Function to delete a department from the database
 * mysql 	> get the list of departments from the database
 * inquirer	> ask the user to choose the department to delete
 * mysql 	> delete the department from the database
 */

deleteDepartment = async () => {
	try {
		//* mysql 	> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// map department names
		const dNames = dObjects.map((d) => d.department);

		//* inquirer	> ask the user to choose the department to delete
		const { departmentName } = await inquireDeleteDepartment(dNames);

		// find employee object with employee name
		const { id: departmentId } = dObjects.find((d) => d.department === departmentName);

		//* mysql 	> delete the department from the database
		const resolveMessage = await sqlDeleteDepartment(departmentId, departmentName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { deleteDepartment };
