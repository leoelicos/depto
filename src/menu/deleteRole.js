/*
 * Employee Management System
 * deleteRole.js
 * this file contains a function that can delete a role from the database
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary, red, green, sqlParamsErr } = require('../utils/chalkRender');

// inquirer function to ask the user to choose the role to delete
const inquireDeleteRole = (roleTitles) =>
	inquirer.prompt([
		{
			name: 'title',
			type: 'list',
			message: primary('Delete role') + secondary('Which role do you want to delete?') + '\n > ',
			choices: roleTitles,
		},
	]);

// import connection
const { db } = require('../../config/connection');

const { sqlGetRoles } = require('./printRoles');

// sql to query database
const sqlDeleteRole = (role_id, roleName) =>
	new Promise(function (resolve, reject) {
		const sql = `	DELETE FROM role
							WHERE id = ?`;
		const params = role_id;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find role ${roleName}`)) : resolve(green(`Deleted ${roleName} from roles`))));
	});

/*
 * Function to delete a role from the database
 * mysql 	> get the list of roles from the database
 * inquirer	> ask the user to choose the role to delete
 * mysql 	> delete the role from the database
 */
const deleteRole = async () => {
	try {
		//* mysql 	> get the list of roles from the database
		const rObjects = await sqlGetRoles();

		// map role titles
		const rTitles = rObjects.map((r) => r.title);

		//* inquirer	> ask the user to choose the role to delete
		const { title: roleTitle } = await inquireDeleteRole(rTitles);

		// find role object with role title
		const { id: roleId } = rObjects.find((r) => r.title === roleTitle);

		//* mysql 	> delete the role from the database
		const resolveMessage = await sqlDeleteRole(roleId, roleTitle);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { deleteRole };
