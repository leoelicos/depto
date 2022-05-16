/*
 * Employee Management System
 * addEmployee.js
 * this file contains a function that can add an employee to the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, green, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask user for the employee's name, and choose the role and the manager
const inquireAddEmployee = (roleTitles, managerNames) =>
	inquirer.prompt([
		{
			name: 'firstName',
			type: 'input',
			message: primary('Add employee') + secondary(`What is the employee's first name?`) + '\n > ',
		},
		{
			name: 'lastName',
			type: 'input',
			message: primary('Add employee') + secondary(`What is the employee's last name?`) + '\n > ',
		},
		{
			name: 'roleTitle',
			type: 'list',
			message: primary('Add employee') + secondary("What is the employee's role?") + '\n > ',
			choices: roleTitles,
		},
		{
			name: 'managerName',
			type: 'list',
			message: primary('Add employee') + secondary("Who is the employee's manager?") + '\n > ',
			choices: managerNames.length === 0 ? ['none'] : [...managerNames, 'none'],
		},
	]);

// import connection
const { db } = require('../../config/connection');

const { sqlGetEmployees } = require('./printEmployees');
const { sqlGetRoles } = require('./printRoles');

// sql to query database
const sqlAddEmployee = (first_name, last_name, role_id, manager_id) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	INSERT INTO employee (first_name, last_name, role_id, manager_id)
				VALUES (?, ?, ?, ?);`;
		const params = [first_name, last_name, role_id, manager_id];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to add employee ${first_name} ${last_name}`)) : resolve(green(`Added ${first_name} ${last_name} to the database`))));
	});

/*
 * Function to add an employee to the database
 * mysql		> get the list of roles from the database
 * mysql 	> get the list of managers from the database
 * inquirer > ask the user for the employee's name, and choose the role and the manager
 * mysql 	> add the employee to the database
 */
const addEmployee = async () => {
	try {
		//* mysql		> get the list of roles from the database
		const rObjects = await sqlGetRoles();

		// map role titles
		const rTitles = rObjects.map((r) => r.title);

		//* mysql 	> get the list of managers from the database
		let mNames;
		let mObjects;
		try {
			// try to map manager names
			mObjects = await sqlGetEmployees();
			mNames = mObjects.map((m) => m.first_name + ' ' + m.last_name);
		} catch (err) {
			// no employees in current database
			if (err === red('No employees found')) {
				mNames = [];
			}
		}

		//* inquirer > ask the user for the employee's name, and choose the role and the manager
		const { firstName, lastName, roleTitle, managerName } = await inquireAddEmployee(rTitles, mNames);

		// find role object with role title
		const { id: roleId } = rObjects.find((r) => r.title === roleTitle);

		// find manager object with manager name
		let { id: managerId } = mObjects.find((m) => m.first_name + ' ' + m.last_name === managerName);

		// if chosen manager is 'none'
		if (managerName === 'none') managerId = null;

		//* mysql 	> add the employee to the database
		const resolveMessage = await sqlAddEmployee(firstName, lastName, roleId, managerId);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { addEmployee };
