/*
 * Employee Management System
 * updateEmployeeRole.js
 * this file contains a function that can update an employee's role in the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, white, green, sqlParamsErr } = require('../utils/chalkRender');

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

// import connection
const { db } = require('../../config/connection');

const { sqlGetEmployees } = require('./printEmployees');
const { sqlGetRoles } = require('./printRoles');

// sql to query database
const sqlUpdateEmployeeRole = (employee_id, role_id, employeeName, roleName) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	UPDATE employee 
				SET role_id = ? 
				WHERE id = ?`;
		const params = [role_id, employee_id];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find employee ${employee_id} or role ${role_id}`)) : result.changedRows === 0 ? resolve(white(`No changes were made`)) : resolve(green(`Updated ${employeeName}'s role to ${roleName}`))));
	});

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
