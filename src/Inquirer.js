/*
 * Employee Management System
 * Inquirer.js
 * this file contains functions that ask the user to input data
 * Copyright 2022 Leo Wong
 */

// import inquirer to handle prompts
const inquirer = require('inquirer');

// utility function to create good-looking console logs
const { primary, secondary } = require('./utils/chalkRender');

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

const inquireViewEmployeesByDepartment = (departmentNames) =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'list',
			message: primary('View employees') + secondary("Which department's employees do you want to view?" + '\n > '),
			choices: departmentNames,
		},
	]);

const inquireViewEmployeesByManager = (managerNames) =>
	inquirer.prompt([
		{
			name: 'managerName',
			type: 'list',
			message: primary('View employees') + secondary("Which manager's employees do you want to view?" + '\n > '),
			choices: managerNames,
		},
	]);

const inquireViewTotalUtilizedBudgetByDepartment = async (departmentNames) =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'list',
			message: primary('View budget') + secondary("Which department's total utilized budget do you want to view?" + '\n > '),
			choices: departmentNames,
		},
	]);

const inquireAddDepartment = () =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'input',
			message: primary('Add department') + secondary(`What is the name of the department?` + '\n > '),
		},
	]);

const inquireAddRole = (departmentNames) =>
	inquirer.prompt([
		{
			name: 'roleTitle',
			type: 'input',
			message: primary('Add role') + secondary(`What is the title of the role?`) + '\n > ',
		},
		{
			name: 'roleSalary',
			type: 'input',
			message: primary('Add role') + secondary(`What is the salary of the role?`) + '\n > ',
		},
		{
			name: 'departmentName',
			type: 'list',
			message: primary('Add role') + secondary('Which department does the role belong to?') + '\n > ',
			choices: departmentNames,
		},
	]);

const inquireAddEmployee = (roleTitles, managerNames) =>
	inquirer.prompt([
		{
			name: 'firstName',
			type: 'input',
			message: primary('Add employee') + secondary(`What is the employee's first name?`) + '\n > ',
		},
		{
			name: 'lastName',
			type: 'input',
			message: primary('Add employee') + secondary(`What is the employee's last name?`) + '\n > ',
		},
		{
			name: 'roleTitle',
			type: 'list',
			message: primary('Add employee') + secondary("What is the employee's role?") + '\n > ',
			choices: roleTitles,
		},
		{
			name: 'managerName',
			type: 'list',
			message: primary('Add employee') + secondary("Who is the employee's manager?") + '\n > ',
			choices: managerNames.length === 0 ? ['none'] : [...managerNames, 'none'],
		},
	]);

const inquireUpdateEmployeeRole = (employeeNames, roleTitles) =>
	inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message: primary('Update employee') + secondary("Which employee's role do you want to update?") + '\n > ',
			choices: employeeNames,
		},
		{
			name: 'roleTitle',
			type: 'list',
			message: primary('Update employee') + secondary('Which role do you want to assign the selected employee?') + '\n > ',
			choices: roleTitles,
		},
	]);

const inquireUpdateEmployeeManager = (employeeNames, managerNames) =>
	inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message: primary('Update employee') + secondary("Which employee's manager do you want to update?") + '\n > ',
			choices: employeeNames,
		},
		{
			name: 'managerName',
			type: 'list',
			message: primary('Update employee') + secondary('Which manager do you want to assign the selected employee?') + '\n > ',
			choices: [...managerNames, 'none'],
		},
	]);

const inquireDeleteDepartment = (departmentNames) =>
	inquirer.prompt([
		{
			name: 'departmentName',
			type: 'list',
			message: primary('Delete department') + secondary('Which department do you want to delete?') + '\n > ',
			choices: departmentNames,
		},
	]);

const inquireDeleteRole = (roleTitles) =>
	inquirer.prompt([
		{
			name: 'title',
			type: 'list',
			message: primary('Delete role') + secondary('Which role do you want to delete?') + '\n > ',
			choices: roleTitles,
		},
	]);

const inquireDeleteEmployee = (employeeNames) =>
	inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message: primary('Delete employee') + secondary('Which employee do you want to delete?') + '\n > ',
			choices: employeeNames,
		},
	]);

module.exports = { inquireMenu, inquireViewEmployeesByDepartment, inquireViewEmployeesByManager, inquireViewTotalUtilizedBudgetByDepartment, inquireAddDepartment, inquireAddRole, inquireAddEmployee, inquireUpdateEmployeeRole, inquireUpdateEmployeeManager, inquireDeleteDepartment, inquireDeleteRole, inquireDeleteEmployee };
