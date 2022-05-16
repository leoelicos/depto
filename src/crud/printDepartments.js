/*
 * Employee Management System
 * printDepartments.js
 * this file contains a function that can print all departments from the database
 * Copyright 2022 Leo Wong
 */

// utility function to create good-looking console logs
const { red, sqlErr } = require('../utils/chalkRender');

// import connection
const { db } = require('../../config/connection');

// sql to query database
const sqlGetDepartments = () =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT id, name AS department 
							 FROM department;`;
		db.query(sql, (err, result) => (err ? reject(new Error(sqlErr(sql, err))) : result.length === 0 ? reject(red('No departments found')) : resolve(result)));
	});

/*
 * Function to print all departments from the database
 * mysql 	> get the list of departments from the database
 */
const printDepartments = async () => {
	try {
		//* mysql 	> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// log view title
		console.log('\nTable: All Departments');

		// log view
		console.table(dObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { printDepartments, sqlGetDepartments };
