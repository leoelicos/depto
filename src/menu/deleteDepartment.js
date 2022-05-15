/*
 * Employee Management System
 * deleteDepartment.js
 * this file contains a function that can delete a department from the database
 * Copyright 2022 Leo Wong
 */

const { inquireDeleteDepartment } = require('../Inquirer');

const { sqlGetDepartments, sqlDeleteDepartment } = require('../mysql2');

/*
 * Function to delete a department from the database
 * mysql 	> get the list of departments from the database
 * inquirer	> ask the user to choose the department to delete
 * mysql 	> delete the department from the database
 */

deleteDepartment = async () => {
	try {
		//* mysql 	> get the list of departments from the database
		const dObjects = await sqlGetDepartments();

		// map department names
		const dNames = dObjects.map((d) => d.department);

		//* inquirer	> ask the user to choose the department to delete
		const { departmentName } = await inquireDeleteDepartment(dNames);

		// find employee object with employee name
		const { id: departmentId } = dObjects.find((d) => d.department === departmentName);

		//* mysql 	> delete the department from the database
		const resolveMessage = await sqlDeleteDepartment(departmentId, departmentName);

		// log result
		console.log(resolveMessage);
		//
	} catch (err) {
		// handle errors
		console.error(err);
	}
};
module.exports = { deleteDepartment };
