// package inquirer to handle prompts
const inquirer = require('inquirer');

// utility library of Inquirer questions
const Questions = require('./questions');

// instantiate library
const questions = new Questions();

// helper functions to call inquirer on library questions
class Prompts {
	// constructor() {}

	menu = async () => await inquirer.prompt(questions.menu());

	viewEmployeesByDepartment = (departments) => inquirer.prompt(questions.viewEmployeesByDepartment(departments));

	viewEmployeesByManager = (managerNames) => inquirer.prompt(questions.viewEmployeesByManager(managerNames));

	viewTotalUtilizedBudgetByDepartment = async (departments) => inquirer.prompt(questions.viewTotalUtilizedBudget(departments));

	addDepartment = () => inquirer.prompt(questions.addDepartment());

	addRole = (departments) => inquirer.prompt(questions.addRole(departments));

	addEmployee = (roles, managers) => inquirer.prompt(questions.addEmployee(roles, managers));

	updateEmployeeRole = (employees, roles) => inquirer.prompt(questions.updateEmployeeRole(employees, roles));

	updateEmployeeManager = (employees, managers) => inquirer.prompt(questions.updateEmployeeManager(employees, managers));

	deleteDepartment = (departments) => inquirer.prompt(questions.deleteDepartment(departments));

	deleteRole = (roles) => inquirer.prompt(questions.deleteRole(roles));

	deleteEmployee = (employees) => inquirer.prompt(questions.deleteEmployee(employees));
}

module.exports = Prompts;
