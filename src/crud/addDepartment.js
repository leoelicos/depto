/*
 * Employee Management System
 * addDepartment.js
 * this file contains a function that can add a department to the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, green, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask user for the department's name
const inquireAddDepartment = () =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'input',
			message: primary('Add department') + secondary(`What is the name of the department?` + '\n > '),
		},
	]);

// import connection
const { db } = require('../../config/connection');

// sql to query database
const sqlAddDepartment = (dName) =>
	new Promise(function (resolve, reject) {
		const sql = `	INSERT INTO department (name)
								VALUES (?);`;
		const params = dName;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to add department ${dName}`)) : resolve(green(`Added ${dName} to the database`))));
	});

/*
 * Function to add a department to the database
 * inquirer	> ask the user for the department's name
 * mysql 	> add the department to the database
 */
const addDepartment = async () => {
	try {
		//* inquirer	> ask the user for the department's name
		const { departmentName } = await inquireAddDepartment();

		//* mysql 	> add the department to the database
		const resolveMessage = await sqlAddDepartment(departmentName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};

module.exports = { addDepartment };
