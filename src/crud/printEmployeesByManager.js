/*
 * Employee Management System
 * printEmployeesByManager.js
 * this file contains a function that can print the employees with a specific manager from the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, sqlErr, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the manager for which to print the employees
const inquireViewEmployeesByManager = (managerNames) =>
	inquirer.prompt([
		{
			name: 'managerName',
			type: 'list',
			message: primary('View employees') + secondary("Which manager's employees do you want to view?" + '\n > '),
			choices: managerNames,
		},
	]);

// import connection
const { db } = require('../../config/connection');

// sql to query database
const sqlGetManagers = () =>
	new Promise(function (resolve, reject) {
		const sql = ` 	SELECT e.id,  e.first_name, e.last_name, title, name AS department, salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager		     
				FROM employee AS e
				INNER JOIN role AS r
				ON e.role_id = r.id
				INNER JOIN department AS d
				ON r.department_id = d.id
				LEFT JOIN employee AS e2
				ON e.manager_id = e2.id
				WHERE e.id IN (
					SELECT e.manager_id		     
					FROM employee AS e
					LEFT JOIN employee AS e2
					ON e.manager_id = e2.id);`;
		db.query(sql, (err, result) => (err ? reject(sqlErr(sql, err)) : result.length === 0 ? reject(red('No managers found')) : resolve(result)));
	});

// sql to query database
const sqlGetEmployeesByManager = (mId, mName) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	SELECT e.id, e.first_name, e.last_name, title 
				FROM employee AS e 
				INNER JOIN role AS r 
				ON e.role_id = r.id 
				INNER JOIN department AS d
				ON r.department_id = d.id
				LEFT JOIN employee AS e2
				ON e.manager_id = e2.id
				WHERE e.manager_id = ?;`;
		const params = mId;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.length === 0 ? reject(red(`No employees found with manager ${mName}`)) : resolve(result)));
	});

/*
 * Function to print the employees with a specific manager from the database
 * mysql 	> get the list of managers from the database
 * inquirer	> ask the user to choose the manager for which to print the employees
 * mysql 	> get the employees with that specific manager from the database
 */
const printEmployeesByManager = async () => {
	try {
		//* mysql 	> get the list of managers from the database
		const mObjects = await sqlGetManagers();

		// map manager names
		const mNames = mObjects.map((m) => m.first_name + ' ' + m.last_name);

		//* inquirer	> ask the user to choose the manager for which to print the employees
		const { managerName } = await inquireViewEmployeesByManager(mNames);

		// find manager object with manager name
		const { id: managerId } = mObjects.find((m) => m.first_name + ' ' + m.last_name === managerName);

		//* mysql 	> get the employees with that specific manager from the database
		const eObjects = await sqlGetEmployeesByManager(managerId, managerName);

		// log view title
		console.log(`\nTable: ${managerName}'s team`);

		// log view
		console.table(eObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printEmployeesByManager };
