/*
 * Employee Management System
 * addRole.js
 * this file contains a function that can add a role to the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, green, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask the user for the role's title and salary and choose the department
const inquireAddRole = (departmentNames) =>
	inquirer.prompt([
		{
			name: 'roleTitle',
			type: 'input',
			message: primary('Add role') + secondary(`What is the title of the role?`) + '\n > ',
		},
		{
			name: 'roleSalary',
			type: 'input',
			message: primary('Add role') + secondary(`What is the salary of the role?`) + '\n > ',
		},
		{
			name: 'departmentName',
			type: 'list',
			message: primary('Add role') + secondary('Which department does the role belong to?') + '\n > ',
			choices: departmentNames,
		},
	]);

// import connection
const { db } = require('../../config/connection');

const { sqlGetDepartments } = require('./printDepartments');

// sql to query database
const sqlAddRole = (roleTitle, roleSalary, departmentId) =>
	new Promise(function (resolve, reject) {
		const sql = `	INSERT INTO role (title, salary, department_id)
				VALUES (?, ?, ?);`;
		const params = [roleTitle, roleSalary, departmentId];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to add role ${roleTitle}`)) : resolve(green(`Added ${roleTitle} to the database`))));
	});

/*
 * Function to add a role to the database
 * mysql		> get the list of departments from the database
 * inquirer > ask the user for the role's title and salary and choose the department
 * mysql 	> add the role to the database
 */

const addRole = async () => {
	try {
		//* mysql		> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// map department names
		const dNames = dObjects.map((d) => d.department);

		//* inquirer > ask the user for the role's title and salary and choose the department
		const { roleTitle, roleSalary, departmentName } = await inquireAddRole(dNames);

		// find department object with department name
		const { id: departmentId } = dObjects.find((d) => d.department === departmentName);

		//* mysql 	> add the role to the database
		const resolveMessage = await sqlAddRole(roleTitle, roleSalary, departmentId);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { addRole };
