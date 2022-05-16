/*
 * Employee Management System
 * updateEmployeeManager.js
 * this file contains a function that can update an employee's manager in the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, white, green, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the employee and the manager
const inquireUpdateEmployeeManager = (employeeNames, managerNames) =>
	inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message: primary('Update employee') + secondary("Which employee's manager do you want to update?") + '\n > ',
			choices: employeeNames,
		},
		{
			name: 'managerName',
			type: 'list',
			message: primary('Update employee') + secondary('Which manager do you want to assign the selected employee?') + '\n > ',
			choices: [...managerNames, 'none'],
		},
	]);

// import connection
const { db } = require('../../config/connection');

const { sqlGetEmployees } = require('./printEmployees');

// sql to query database
const sqlUpdateEmployeeManager = (employee_id, manager_id, employeeName, managerName) =>
	new Promise(function (resolve, reject) {
		const sql = `	UPDATE employee
							SET manager_id = ?
							WHERE id = ?`;
		const params = [manager_id, employee_id];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find either employee ${employeeName} or manager ${managerName}`)) : result.changedRows === 0 ? reject(white(`No changes were made`)) : resolve(green(`Updated ${employeeName}'s manager to ${managerName}`))));
	});

/*
 * Function to update an employee's manager in the database
 * mysql 	> get the list of employees from the database
 * mysql 	> get the list of managers from the database
 * inquirer	> ask the user to choose the employee and the manager
 * mysql 	> update the employee's manager in the database
 */
const updateEmployeeManager = async () => {
	try {
		//* mysql 	> get the list of employees from the database
		const eObjects = await sqlGetEmployees();

		// map employee names
		const eNames = eObjects.map((e) => e.first_name + ' ' + e.last_name);

		//* mysql 	> get the list of managers from the database
		const mObjects = await sqlGetEmployees();

		// map manager names
		const mNames = mObjects.map((m) => m.first_name + ' ' + m.last_name);

		//* inquirer	> ask the user to choose the employee and the manager
		const { employeeName, managerName } = await inquireUpdateEmployeeManager(eNames, mNames);

		// find employee object with employee name
		const { id: employeeId } = eObjects.find((e) => e.first_name + ' ' + e.last_name === employeeName);

		// find manager object with manager name
		let { id: managerId } = mObjects.find((m) => m.first_name + ' ' + m.last_name === managerName);

		// if chosen manager is 'none'
		if (managerName === 'none') managerId = null;

		//* mysql 	> update the employee's manager in the database
		const resolveMessage = await sqlUpdateEmployeeManager(employeeId, managerId, employeeName, managerName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { updateEmployeeManager };
