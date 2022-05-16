/*
 * Employee Management System
 * index.js
 * this file runs the system by repeatedly prompting the user for menu actions
 * Copyright 2022 Leo Wong
 */

//* import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary } = require('./src/utils/chalkRender');

//* inquirer function that asks user which menu action they would like
const inquireMenu = () =>
	inquirer.prompt([
		{
			name: 'menu',
			type: 'list',
			prefix: ' ' + primary('Menu'.padEnd(120)) + '\n',
			message: secondary('What would you like to do?'.padEnd(120)) + '\n > ',
			choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Department', 'View Employees by Manager', 'View Total Utilized Budget by Department', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee', 'Quit'],
			pageSize: 5,
		},
	]);

// CRUD

//* import create scripts
const { addDepartment } = require('./src/crud/addDepartment.js');
const { addEmployee } = require('./src/crud/addEmployee.js');
const { addRole } = require('./src/crud/addRole.js');

//* import read scripts
const { printDepartments } = require('./src/crud/printDepartments.js');
const { printEmployees } = require('./src/crud/printEmployees.js');
const { printEmployeesByDepartment } = require('./src/crud/printEmployeesByDepartment.js');
const { printEmployeesByManager } = require('./src/crud/printEmployeesByManager.js');
const { printRoles } = require('./src/crud/printRoles.js');
const { printUtilizedBudgetByDepartment } = require('./src/crud/printUtilizedBudgetByDepartment.js');

//* import update scripts
const { updateEmployeeManager } = require('./src/crud/updateEmployeeManager.js');
const { updateEmployeeRole } = require('./src/crud/updateEmployeeRole.js');

//* import delete scripts
const { deleteDepartment } = require('./src/crud/deleteDepartment.js');
const { deleteEmployee } = require('./src/crud/deleteEmployee.js');
const { deleteRole } = require('./src/crud/deleteRole.js');

//* import disconnect function
const { disconnect } = require('./config/connection');

//* import utility function to render user messages
const { logoHelper } = require('./src/utils/chalkRender');

// Function to prompt the user for actions
const ems = async () => {
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
};

// function to start the application
const init = async () => {
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
};

// start the application
init();
