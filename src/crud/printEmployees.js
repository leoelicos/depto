/*
 * Employee Management System
 * printEmployees.js
 * this file contains a function that can print all employees from the database
 * Copyright 2022 Leo Wong
 */

// utility function to create good-looking console logs
const { red, sqlErr } = require('../utils/chalkRender');

// import connection
const { db } = require('../../config/connection');

// sql to query database
const sqlGetEmployees = () =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, 
				CONCAT(e2.first_name,' ',e2.last_name) AS manager
				FROM employee AS e
				INNER JOIN role AS r
				ON e.role_id = r.id
				INNER JOIN department AS d
				ON r.department_id = d.id
				LEFT JOIN employee AS e2
				ON e.manager_id = e2.id;`;
		db.query(sql, (err, result) => (err ? reject(sqlErr(sql, err)) : result.length === 0 ? reject(red('No employees found')) : resolve(result)));
	});
/*
 * Function to print all employees from the database
 * mysql 	> get the list of employees from the database
 */
const printEmployees = async () => {
	try {
		//* mysql 	> get the list of employees from the database
		const eObjects = await sqlGetEmployees();

		// log view title
		console.log('\nTable: All employees');

		// log view
		console.table(eObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printEmployees, sqlGetEmployees };
