/*
 * Employee Management System
 * printRoles.js
 * this file contains a function that can print all roles from the database
 * Copyright 2022 Leo Wong
 */

// utility function to create good-looking console logs
const { red, sqlErr } = require('../utils/chalkRender');

// import connection
const { db } = require('../../config/connection');

// sql to query database
const sqlGetRoles = () =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT r.id, r.title, d.name AS department, r.salary
								FROM role AS r
								INNER JOIN department AS d
									ON r.department_id = d.id;`;
		db.query(sql, (err, result) => (err ? reject(sqlErr(sql, err)) : result.length === 0 ? reject(red('No roles found')) : resolve(result)));
	});

/*
 * Function to print all roles from the database
 * mysql 	> get the list of roles from the database
 */

const printRoles = async () => {
	try {
		//* mysql 	> get the list of roles from the database
		const rObjects = await sqlGetRoles();

		// log view title
		console.log('\nTable: All Roles');

		// log view
		console.table(rObjects);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { printRoles, sqlGetRoles };
