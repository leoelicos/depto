/*
 * Employee Management System
 * deleteEmployee.js
 * this file contains a function that can delete an employee from the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, green, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the employee to delete
const inquireDeleteEmployee = (employeeNames) =>
	inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message: primary('Delete employee') + secondary('Which employee do you want to delete?') + '\n > ',
			choices: employeeNames,
		},
	]);

// import connection
const { db } = require('../../config/connection');

const { sqlGetEmployees } = require('./printEmployees');

// sql to query database
const sqlDeleteEmployee = (employee_id, employeeName) =>
	new Promise(function (resolve, reject) {
		const sql = `	DELETE FROM employee 
							 	WHERE id = ?`;
		const params = employee_id;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find employee ${employeeName}`)) : resolve(green(`Deleted ${employeeName} from employees`))));
	});

/*
 * Function to delete an employee from the database
 * mysql 	> get the list of employees from the database
 * inquirer	> ask the user to choose the employee to delete
 * mysql 	> delete the employee from the database
 */
const deleteEmployee = async () => {
	try {
		//* mysql 	> get the list of employees from the database
		const eObjects = await sqlGetEmployees();

		// map employee names
		const eNames = eObjects.map((e) => e.first_name + ' ' + e.last_name);

		//* inquirer	> ask the user to choose the employee to delete
		const { employeeName } = await inquireDeleteEmployee(eNames);

		// find employee object with employee name
		const { id: employeeId } = eObjects.find((e) => e.first_name + ' ' + e.last_name === employeeName);

		//* mysql 	> delete the employee from the database
		const resolveMessage = await sqlDeleteEmployee(employeeId, employeeName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { deleteEmployee };
