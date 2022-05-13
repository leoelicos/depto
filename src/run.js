const Prompts = require('./prompts');
const prompts = new Prompts();

const Connection = require('./connection');
const connection = new Connection();

const { primary, secondary } = require('./utils/chalkRender');

let run = async () => {
	//
	// prompt user for action
	const { menu } = await prompts.menu();
	if (menu === 'Quit') quit();

	// perform action
	// TODO: is there a better way to structure this?
	if (menu === 'View All Departments') await printDepartments();
	if (menu === 'View All Roles') await printRoles();
	if (menu === 'View All Employees') await printEmployees();
	if (menu === 'View Employees by Department') await printEmployeesByDepartment();
	if (menu === 'View Employees by Manager') await printEmployeesByManager();

	if (menu === 'View Total Utilized Budget by Department') await printUtilizedBudgetByDepartment();
	if (menu === 'Add Department') await addDepartment();
	if (menu === 'Add Role') await addRole();
	if (menu === 'Add Employee') await addEmployee();
	if (menu === 'Update Employee Role') await updateEmployeeRole();
	if (menu === 'Update Employee Manager') await updateEmployeeManager();
	if (menu === 'Delete Department') await deleteDepartment();
	if (menu === 'Delete Role') await deleteRole();
	if (menu === 'Delete Employee') await deleteEmployee();

	// after waiting, run this function again
	run();
};

const quit = () => {
	connection.disconnectDatabase();
	process.exit();
};
const printDepartments = async () => {
	const departments = await connection.getDepartments();

	console.log('\nTable: All Departments');
	console.table(departments);
};

const printRoles = async () => {
	const roles = await connection.getRoles();

	console.log('\nTable: All Roles');
	console.table(roles);
};

const printEmployees = async () => {
	const employees = await connection.getEmployees();

	console.log('\nTable: All employees');
	console.table(employees);
};

const printEmployeesByDepartment = async () => {
	const departments = await connection.getDepartments();
	const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
	const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
	const departmentNames = mapDepartmentNames(departments);

	const { department_name: departmentName } = await prompts.viewEmployeesByDepartment(departmentNames);

	const { id: department_id } = findDepartmentId(departments, departmentName);

	const employees = await connection.getEmployeesByDepartment(department_id, departmentName);

	console.log(`\nTable: Employees in ${departmentName}`);
	console.table(employees);
};
const printEmployeesByManager = async () => {
	const mapManagerNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
	const findManagerId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
	const managers = await connection.getManagers();
	const managerNames = mapManagerNames(managers);

	const { manager_name: managerName } = await prompts.viewEmployeesByManager(managerNames);
	const { id: managerId } = findManagerId(managers, managerName);

	const employees = await connection.getEmployeesByManager(managerId, managerName);

	console.log(`\nTable: ${managerName}'s team`);
	console.table(employees);
};

const printUtilizedBudgetByDepartment = async () => {
	const departments = await connection.getDepartments();
	const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
	const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
	const departmentNames = mapDepartmentNames(departments);

	const { department_name } = await prompts.viewTotalUtilizedBudgetByDepartment(departmentNames);

	const { id: department_id } = findDepartmentId(departments, department_name);

	const budget = await connection.getTotalUtilizedBudget(department_id);

	console.log(`\nTable: Total Utilized Budget in ${department_name}`);
	console.table(budget);
};

const deleteEmployee = async () => {
	const employees = await connection.getEmployees();
	const mapEmployeeNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
	const findEmployeeId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
	const employeeNames = mapEmployeeNames(employees);

	const { employee_name: employeeName } = await prompts.deleteEmployee(employeeNames);

	const { id: employee_id } = findEmployeeId(employees, employeeName);

	const result = await connection.deleteEmployee(employee_id, employeeName);
	console.log('   ' + secondary(result));
};

const deleteRole = async () => {
	const roles = await connection.getRoles();
	const mapRoleNames = (arr) => arr.map((val) => `${val.title}`);
	const findRoleId = (arr, targetName) => arr.find((val) => val.title === targetName);
	const roleNames = mapRoleNames(roles);

	const { role_name: roleName } = await prompts.deleteRole(roleNames);

	const { id: role_id } = findRoleId(roles, roleName);

	const result = await connection.deleteRole(role_id, roleName);
	console.log('   ' + secondary(result));
};

const deleteDepartment = async () => {
	const departments = await connection.getDepartments();
	const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
	const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
	const departmentNames = mapDepartmentNames(departments);
	const { department_name: departmentName } = await prompts.deleteDepartment(departmentNames);

	const { id: department_id } = findDepartmentId(departments, departmentName);

	const result = await connection.deleteDepartment(department_id, departmentName);
	console.log('   ' + secondary(result));
};

// updateEmployeeManager
const updateEmployeeManager = async () => {
	const employees = await connection.getEmployees();
	const mapEmployeeNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
	const findEmployeeId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
	const employeeNames = mapEmployeeNames(employees);

	const managers = await connection.getEmployees();
	const mapManagerNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
	const findManagerId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);

	// const managerNames = mapManagerNames(managers).push('none');
	const managerNames = mapManagerNames(managers);

	const { employee_name: employeeName, manager_name: managerName } = await prompts.updateEmployeeManager(employeeNames, managerNames);
	const { id: employeeId } = findEmployeeId(employees, employeeName);
	let managerId;
	if (managerName === 'none') {
		managerId = null;
	} else {
		managerId = findManagerId(managers, managerName).id;
	}
	const result = await connection.updateEmployeeManager(employeeId, managerId, employeeName, managerName);
	console.log('   ' + secondary(result));
};

// updateEmployeeRole
const updateEmployeeRole = async () => {
	const employees = await connection.getEmployees();
	const mapEmployeeNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
	const findEmployeeId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
	const employeeNames = mapEmployeeNames(employees);

	const roles = await connection.getRoles();
	const mapRoleNames = (arr) => arr.map((val) => `${val.title}`);
	const findRoleId = (arr, targetName) => arr.find((val) => val.title === targetName);

	const roleNames = mapRoleNames(roles);

	const { employee_name: employeeName, role_name: roleName } = await prompts.updateEmployeeRole(employeeNames, roleNames);

	const { id: employeeId } = findEmployeeId(employees, employeeName);
	const { id: roleId } = findRoleId(roles, roleName);

	const result = await connection.updateEmployeeRole(employeeId, roleId, employeeName, roleName);
	console.log('   ' + secondary(result));
};

const addDepartment = async () => {
	const { name } = await prompts.addDepartment();
	const result = await connection.addDepartment(name);
	console.log('   ' + secondary(result));
};

const addRole = async () => {
	const departments = await connection.getDepartments();
	const mapDepartmentNames = (arr) => arr.map((val) => `${val.department}`);
	const findDepartmentId = (arr, targetName) => arr.find((val) => val.department === targetName);
	const departmentNames = mapDepartmentNames(departments);

	const { title, salary, department_name } = await prompts.addRole(departmentNames);

	const { id: department_id } = findDepartmentId(departments, department_name);

	const result = await connection.addRole(title, salary, department_id);
	console.log('    ' + secondary(result));
};

const addEmployee = async () => {
	const roles = await connection.getRoles();
	const mapRoleNames = (arr) => arr.map((val) => `${val.title}`);
	const findRoleId = (arr, targetName) => arr.find((val) => val.title === targetName);
	const roleNames = mapRoleNames(roles);

	const managers = await connection.getEmployees();
	const mapManagerNames = (arr) => arr.map((val) => `${val.first_name} ${val.last_name}`);
	const findManagerId = (arr, targetName) => arr.find((val) => `${val.first_name} ${val.last_name}` === targetName);
	const managerNames = mapManagerNames(managers);

	if (managerNames[0] === 'undefined undefined') {
		managerNames[0] = 'none';
	}

	const { first_name: firstName, last_name: lastName, role_name: roleName, manager_name: managerName } = await prompts.addEmployee(roleNames, managerNames);

	const { id: roleId } = findRoleId(roles, roleName);
	let managerId;
	if (managerName === 'none') {
		managerId = null;
	} else {
		managerId = findManagerId(managers, managerName).id;
	}

	const result = await connection.addEmployee(firstName, lastName, roleId, managerId);
	console.log('    ' + secondary(result));
};

module.exports = run;
