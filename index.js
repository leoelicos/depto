/*
 * Employee Management System
 * index.js
 * this file contains Menu class that prompts the user for menu actions
 * Copyright 2022 Leo Wong
 */

// import function that asks user which menu action they would like
const { inquireMenu } = require('./src/Inquirer');

// import CRUD scripts that implement each menu action

//* create
const { addDepartment } = require('./src/menu/addDepartment.js');
const { addEmployee } = require('./src/menu/addEmployee.js');
const { addRole } = require('./src/menu/addRole.js');

//* read
const { printDepartments } = require('./src/menu/printDepartments.js');
const { printEmployees } = require('./src/menu/printEmployees.js');
const { printEmployeesByDepartment } = require('./src/menu/printEmployeesByDepartment.js');
const { printEmployeesByManager } = require('./src/menu/printEmployeesByManager.js');
const { printRoles } = require('./src/menu/printRoles.js');
const { printUtilizedBudgetByDepartment } = require('./src/menu/printUtilizedBudgetByDepartment.js');

//* update
const { updateEmployeeManager } = require('./src/menu/updateEmployeeManager.js');
const { updateEmployeeRole } = require('./src/menu/updateEmployeeRole.js');

//* delete
const { deleteDepartment } = require('./src/menu/deleteDepartment.js');
const { deleteEmployee } = require('./src/menu/deleteEmployee.js');
const { deleteRole } = require('./src/menu/deleteRole.js');

// import disconnect function
const { disconnect } = require('./config/connection');

// import utility function to render user messages
const { logoHelper } = require('./src/utils/chalkRender');

// start the application
init();

// function to start the application
async function init() {
	//
	// welcome message
	logoHelper('', ' ');
	logoHelper('', '*');
	logoHelper(' EMPLOYEE MANAGEMENT SYSTEM ', ' ');
	logoHelper('', '*');
	logoHelper('', ' ');

	// start the menu and wait for it to finish
	await ems();

	// disconnect from server
	await disconnect();

	// goodbye message
	logoHelper('Thank you for using Employee Management System.');
}

// Function to prompt the user for actions
async function ems() {
	// prompt user for menu option
	let { menu } = await inquireMenu();
	// base case
	if (menu === 'Quit') {
		return;
	} else if (menu === 'View All Departments') {
		await printDepartments();
	} else if (menu === 'View All Roles') {
		await printRoles();
	} else if (menu === 'View All Employees') {
		await printEmployees();
	} else if (menu === 'View Employees by Department') {
		await printEmployeesByDepartment();
	} else if (menu === 'View Employees by Manager') {
		await printEmployeesByManager();
	} else if (menu === 'View Total Utilized Budget by Department') {
		await printUtilizedBudgetByDepartment();
	} else if (menu === 'Add Department') {
		await addDepartment();
	} else if (menu === 'Add Role') {
		await addRole();
	} else if (menu === 'Add Employee') {
		await addEmployee();
	} else if (menu === 'Update Employee Role') {
		await updateEmployeeRole();
	} else if (menu === 'Update Employee Manager') {
		await updateEmployeeManager();
	} else if (menu === 'Delete Department') {
		await deleteDepartment();
	} else if (menu === 'Delete Role') {
		await deleteRole();
	} else if (menu === 'Delete Employee') {
		await deleteEmployee();
	}
	await ems();
}
