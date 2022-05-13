// mysql2 is an npm library package which allows javascript access to an SQL database
const mysql = require('mysql2');

// import SQL class
const SQL = require('./sql');

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'xxxx',
		database: 'cms',
	},
	'Connected to cms'
);

class Connection {
	constructor() {
		this.sql = new SQL();
	}

	getDepartments() {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewAllDepartments();
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve(['No departments found']);
				resolve(result);
			});
		});
	}

	getRoles() {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewAllRoles();
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve(['No roles found']);
				resolve(result);
			});
		});
	}

	getEmployees() {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewAllEmployees();
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve(['No employees found']);
				resolve(result);
			});
		});
	}

	getManagers() {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewAllManagers();
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				// if (result.length === 0) resolve(['No managers found']);
				resolve(result);
			});
		});
	}

	getEmployeesByDepartment(department_id, departmentName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewAllEmployeesByDepartment();
			const params = department_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve([`No employees found in department ${departmentName}`]);
				resolve(result);
			});
		});
	}

	getEmployeesByManager(manager_id, managerName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewAllEmployeesByManager();
			const params = manager_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve([`No employees found with manager ${managerName}`]);
				resolve(result);
			});
		});
	}

	getTotalUtilizedBudget(department_id) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().viewTotalUtilizedBudget();
			const params = department_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}; sql = ${sql}; params = ${params}`));
				// if (result.length === 0) resolve([`No utilizd budget found for department ${department_id}`]);
				resolve(result);
			});
		});
	}

	addDepartment(name) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().addDepartment();
			const params = name;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to add department ${name}`);
				resolve(`Added ${name} to the database`);
			});
		});
	}

	addRole(title, salary, department_id) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().addRole();
			const params = [title, salary, department_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to add role ${title}`);
				resolve(`Added ${title} to the database`);
			});
		});
	}

	addEmployee(first_name, last_name, role_id, manager_id) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().addEmployee();
			const params = [first_name, last_name, role_id, manager_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to add employee ${first_name} ${last_name}`);
				resolve(`Added ${first_name} ${last_name} to the database`);
			});
		});
	}

	updateEmployeeRole(employee_id, role_id, employeeName, roleName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().updateEmployeeRole();
			const params = [role_id, employee_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find employee ${employee_id} or role ${role_id}`);
				if (result.affectedRows === 1 && result.changedRows === 0) resolve(`Found employee ${employee_id} and role ${role_id} but no change was made`);
				resolve(`Updated ${employeeName}'s role to ${roleName}`);
			});
		});
	}

	updateEmployeeManager(employee_id, manager_id, employeeName, managerName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().updateEmployeeManager();
			const params = [manager_id, employee_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find employee ${employee_id} or manager ${manager_id}`);
				if (result.affectedRows === 1 && result.changedRows === 0) resolve(`Found employee ${employee_id} and manager ${manager_id} but no change was made`);
				resolve(`Updated ${employeeName}'s manager to ${managerName}`);
			});
		});
	}

	deleteDepartment(department_id, departmentName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().deleteDepartment();
			const params = department_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find department ${departmentName}`);
				resolve(`Deleted ${departmentName} from departments`);
			});
		});
	}

	deleteRole(role_id, roleName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().deleteRole();
			const params = role_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find role ${roleName}`);
				resolve(`Deleted ${roleName} from roles`);
			});
		});
	}

	deleteEmployee(employee_id, employeeName) {
		return new Promise(function (resolve, reject) {
			const sql = new SQL().deleteEmployee();
			const params = employee_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find employee ${employeeName}`);
				resolve(`Deleted ${employeeName} from employees`);
			});
		});
	}

	// Disconnect from database
	disconnectDatabase() {
		db.end();
	}
}
module.exports = Connection;
