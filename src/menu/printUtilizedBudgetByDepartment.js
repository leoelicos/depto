/*
 * Employee Management System
 * printUtilizedBudgetByDepartment.js
 * this file contains a function that can print the total utilized budget by department from the database
 * Copyright 2022 Leo Wong
 */

const { inquireViewTotalUtilizedBudgetByDepartment } = require('../Inquirer');

const { sqlGetDepartments, sqlGetTotalUtilizedBudget } = require('../mysql2');

/*
 * Function to print the total utilized budget by department from the database
 * mysql 	> get the list of departments from the database
 * inquirer	> ask the user to choose the department for which to print the budget
 * mysql 	> get the budget from the database
 */
printUtilizedBudgetByDepartment = async () => {
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
