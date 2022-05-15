const Inquirer = require('./Inquirer');
const inquirer = new Inquirer();

const Mysql = require('./Mysql');
const mysql = new Mysql();

const { secondary, tertiary, quaternary } = require('./utils/chalkRender');

class EMS {
	run = async () => {
		let { menu } = await this.launchMenu();
		if (menu === 'Quit') {
			this.quit();
		}

		if (menu === 'View All Departments') {
			await this.printDepartments();
		} else if (menu === 'View All Roles') {
			await this.printRoles();
		} else if (menu === 'View All Employees') {
			await this.printEmployees();
		} else if (menu === 'View Employees by Department') {
			await this.printEmployeesByDepartment();
		} else if (menu === 'View Employees by Manager') {
			await this.printEmployeesByManager();
		} else if (menu === 'View Total Utilized Budget by Department') {
			await this.printUtilizedBudgetByDepartment();
		} else if (menu === 'Add Department') {
			await this.addDepartment();
		} else if (menu === 'Add Role') {
			await this.addRole();
		} else if (menu === 'Add Employee') {
			await this.addEmployee();
		} else if (menu === 'Update Employee Role') {
			await this.updateEmployeeRole();
		} else if (menu === 'Update Employee Manager') {
			await this.updateEmployeeManager();
		} else if (menu === 'Delete Department') {
			await this.deleteDepartment();
		} else if (menu === 'Delete Role') {
			await this.deleteRole();
		} else if (menu === 'Delete Employee') {
			await this.deleteEmployee();
		}

		this.run();
	};

	launchMenu = async () => await inquirer.menu();

	quit = () => {
		// goodbye message
		console.log(tertiary('Thank you for using Employee Management System.'));

		//* sql disconnect
		mysql.disconnectDatabase();

		//* exit node application
		process.exit();
	};

	// mysql > console
	printDepartments = async () => {
		try {
			//* departments
			const dObjects = await mysql.getDepartments();

			// log view title
			console.log('\nTable: All Departments');

			// log view
			console.table(dObjects);

			// handle errors
		} catch (err) {
			console.error(err);
		}
	};

	// mysql > console
	printRoles = async () => {
		try {
			//* sql roles
			const rObjects = await mysql.getRoles();

			// log view title
			console.log('\nTable: All Roles');

			// log view
			console.table(rObjects);

			// handle errors
		} catch (err) {
			console.error(err);
		}
	};

	// mysql > console
	printEmployees = async () => {
		try {
			//* sql employees
			const eObjects = await mysql.getEmployees();

			// log view title
			console.log('\nTable: All employees');

			// log view
			console.table(eObjects);

			// handle errors
		} catch (err) {
			console.error(err);
		}
	};

	// mysql > inquirer > mysql > console
	printEmployeesByDepartment = async () => {
		try {
			//* sql: departments
			const dObjects = await mysql.getDepartments();

			// map department names
			const dNames = dObjects.map((d) => d.department);

			//* inquirer: department name
			const answer = await inquirer.viewEmployeesByDepartment(dNames);

			// get department name from answer
			const dName = answer.department_name;

			// get department object with this name
			const d = dObjects.find((d) => d.department === dName);

			// get department id
			const dId = d.id;

			//* sql: employees
			const eObjects = await mysql.getEmployeesByDepartment(dId, dName);

			// log view title
			console.log(`\nTable: Employees in ${dName}`);

			// log view
			console.table(eObjects);

			// handle errors
		} catch (err) {
			console.error(err);
		}
	};

	printEmployeesByManager = async () => {
		const mapManagerNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
		const findManagerId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
		const managers = await mysql.getManagers();
		const managerNames = mapManagerNames(managers);

		if (managerNames[0] === undefined) {
			console.log('  ' + quaternary('There are no managers to choose.'));
			return;
		}

		const { manager_name: managerName } = await inquirer.viewEmployeesByManager(managerNames);
		const { id: managerId } = findManagerId(managers, managerName);

		const employees = await mysql.getEmployeesByManager(managerId, managerName);

		console.log(`\nTable: ${managerName}'s team`);
		console.table(employees);
	};

	printUtilizedBudgetByDepartment = async () => {
		const departments = await mysql.getDepartments();
		const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
		const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
		const departmentNames = mapDepartmentNames(departments);

		if (departmentNames[0] === 'undefined') {
			console.log('  ' + quaternary('There are no departments to choose.'));
			return;
		}

		const { department_name } = await inquirer.viewTotalUtilizedBudgetByDepartment(departmentNames);

		const { id: department_id } = findDepartmentId(departments, department_name);

		const budget = await mysql.getTotalUtilizedBudget(department_id);

		console.log(`\nTable: Total Utilized Budget in ${department_name}`);
		console.table(budget);
	};

	deleteEmployee = async () => {
		const employees = await mysql.getEmployees();
		const mapEmployeeNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
		const findEmployeeId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
		const employeeNames = mapEmployeeNames(employees);

		if (employeeNames[0] === 'undefined undefined') {
			console.log('  ' + quaternary('There are no employees to delete.'));
			return;
		}

		const { employee_name: employeeName } = await inquirer.deleteEmployee(employeeNames);

		const { id: employee_id } = findEmployeeId(employees, employeeName);

		const result = await mysql.deleteEmployee(employee_id, employeeName);
		console.log('   ' + secondary(result));
	};

	deleteRole = async () => {
		const roles = await mysql.getRoles();
		const mapRoleNames = (arr) => arr.map((val) => `${val.title}`);
		const findRoleId = (arr, targetName) => arr.find((val) => val.title === targetName);
		const roleNames = mapRoleNames(roles);

		if (roleNames[0] === 'undefined') {
			console.log('  ' + quaternary('There are no roles to delete.'));
			return;
		}

		const { role_name: roleName } = await inquirer.deleteRole(roleNames);

		const { id: role_id } = findRoleId(roles, roleName);

		const result = await mysql.deleteRole(role_id, roleName);
		console.log('   ' + secondary(result));
	};

	deleteDepartment = async () => {
		const departments = await mysql.getDepartments();
		const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
		const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
		const departmentNames = mapDepartmentNames(departments);

		if (departmentNames[0] === 'undefined') {
			console.log('  ' + quaternary('There are no departments to delete.'));
			return;
		}

		const { department_name: departmentName } = await inquirer.deleteDepartment(departmentNames);
		const { id: department_id } = findDepartmentId(departments, departmentName);

		const result = await mysql.deleteDepartment(department_id, departmentName);
		console.log('   ' + secondary(result));
	};

	// updateEmployeeManager
	updateEmployeeManager = async () => {
		const employees = await mysql.getEmployees();
		const mapEmployeeNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
		const findEmployeeId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
		const employeeNames = mapEmployeeNames(employees);

		if (employeeNames[0] === 'undefined undefined') {
			console.log('  ' + quaternary('There are no employees to update.'));
			return;
		}

		const managers = await mysql.getEmployees();
		const mapManagerNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
		const findManagerId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
		const managerNames = mapManagerNames(managers);

		if (managerNames[0] === 'undefined undefined') {
			console.log('  ' + quaternary(`There are no managers to choose. You can't be your own manager in this system.`));
			return;
		}

		const { employee_name: employeeName, manager_name: managerName } = await inquirer.updateEmployeeManager(employeeNames, managerNames);
		const { id: employeeId } = findEmployeeId(employees, employeeName);
		let managerId;
		if (managerName === 'none') {
			managerId = null;
		} else {
			managerId = findManagerId(managers, managerName).id;
		}
		const result = await mysql.updateEmployeeManager(employeeId, managerId, employeeName, managerName);
		console.log('   ' + secondary(result));
	};

	// updateEmployeeRole
	updateEmployeeRole = async () => {
		const employees = await mysql.getEmployees();
		const mapEmployeeNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
		const findEmployeeId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
		const employeeNames = mapEmployeeNames(employees);

		if (employeeNames[0] === 'undefined undefined') {
			console.log('  ' + quaternary('There are no employees to update.'));
			return;
		}

		const roles = await mysql.getRoles();
		const mapRoleNames = (arr) => arr.map((val) => `${val.title}`);
		const findRoleId = (arr, targetName) => arr.find((val) => val.title === targetName);
		const roleNames = mapRoleNames(roles);

		if (roleNames[0] === 'undefined') {
			console.log('  ' + quaternary('There are no roles to choose.'));
			return;
		}

		const { employee_name: employeeName, role_name: roleName } = await inquirer.updateEmployeeRole(employeeNames, roleNames);

		const { id: employeeId } = findEmployeeId(employees, employeeName);
		const { id: roleId } = findRoleId(roles, roleName);

		const result = await mysql.updateEmployeeRole(employeeId, roleId, employeeName, roleName);
		console.log('   ' + secondary(result));
	};

	addDepartment = async () => {
		const { name } = await inquirer.addDepartment();
		const result = await mysql.addDepartment(name);
		console.log('   ' + secondary(result));
	};

	addRole = async () => {
		const departments = await mysql.getDepartments();
		const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
		const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
		const departmentNames = mapDepartmentNames(departments);

		if (departmentNames[0] === 'undefined') {
			console.log('  ' + quaternary('There are no departments to choose.'));
			return;
		}

		const { title, salary, department_name } = await inquirer.addRole(departmentNames);

		const { id: department_id } = findDepartmentId(departments, department_name);

		const result = await mysql.addRole(title, salary, department_id);
		console.log('    ' + secondary(result));
	};

	addEmployee = async () => {
		const roles = await mysql.getRoles();
		const mapRoleNames = (arr) => arr.map((val) => `${val.title}`);
		const findRoleId = (arr, targetName) => arr.find((val) => val.title === targetName);
		const roleNames = mapRoleNames(roles);

		if (roleNames[0] === 'undefined') {
			console.warn = 'Create a role first';
			return;
		}

		const managers = await mysql.getEmployees();
		const mapManagerNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
		const findManagerId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
		const managerNames = mapManagerNames(managers);

		const { first_name: firstName, last_name: lastName, role_name: roleName, manager_name: managerName } = await inquirer.addEmployee(roleNames, managerNames);

		const { id: roleId } = findRoleId(roles, roleName);
		let managerId;
		if (managerName === 'none') {
			managerId = null;
		} else {
			managerId = findManagerId(managers, managerName).id;
		}

		const result = await mysql.addEmployee(firstName, lastName, roleId, managerId);
		console.log('    ' + secondary(result));
	};
}

module.exports = EMS;
