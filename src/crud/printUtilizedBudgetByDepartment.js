/*
 * Employee Management System
 * printUtilizedBudgetByDepartment.js
 * this file contains a function that can print the total utilized budget by department from the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the department for which to print the budget
const inquireViewTotalUtilizedBudgetByDepartment = async (departmentNames) =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'list',
			message: primary('View budget') + secondary("Which department's total utilized budget do you want to view?" + '\n > '),
			choices: departmentNames,
		},
	]);

// import connection
const { db } = require('../../config/connection');

// sql to query database
const { sqlGetDepartments } = require('./printDepartments');

const sqlGetTotalUtilizedBudget = (dId, dName) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	SELECT d.name AS 'department', SUM(salary) AS 'total utilized budget'            
							FROM employee AS e
							INNER JOIN role AS r
								ON e.role_id = r.id
							INNER JOIN department AS d
								ON r.department_id = d.id
							WHERE r.department_id = ?;`;
		const params = dId;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result[0].department === null ? reject(red(`No budget found for department ${dName}`)) : resolve(result)));
	});
/*
 * Function to print the total utilized budget by department from the database
 * mysql 	> get the list of departments from the database
 * inquirer	> ask the user to choose the department for which to print the budget
 * mysql 	> get the budget from the database
 */
const printUtilizedBudgetByDepartment = async () => {
	try {
		//* mysql 	> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// map department names
		const dNames = dObjects.map((d) => d.department);

		//* inquirer	> ask the user to choose the department for which to print the budget
		const { departmentName } = await inquireViewTotalUtilizedBudgetByDepartment(dNames);

		// find department object with department name
		const { id: departmentId } = dObjects.find((d) => d.department === departmentName);

		//* mysql 	> get the budget from the database
		const budget = await sqlGetTotalUtilizedBudget(departmentId, departmentName);

		// log view title
		console.log(`\nTable: Total Utilized Budget in ${departmentName}`);

		// log view
		console.table(budget);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printUtilizedBudgetByDepartment };
