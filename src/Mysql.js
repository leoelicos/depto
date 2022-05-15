// import Connection class
const db = require('../config/connection');

class Mysql {
	getDepartments = () =>
		new Promise(function (resolve, reject) {
			const sql = `
		SELECT id, name AS department 
		FROM department;
		`;
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve(['No departments found']);
				resolve(result);
			});
		});

	getRoles = () =>
		new Promise(function (resolve, reject) {
			const sql = `
			SELECT r.id, r.title, d.name AS department, r.salary
			FROM role AS r
			JOIN department AS d
			ON r.department_id = d.id;
			`;
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve(['No roles found']);
				resolve(result);
			});
		});

	getEmployees = () =>
		new Promise(function (resolve, reject) {
			const sql = `
			SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, 
			CONCAT(e2.first_name,' ',e2.last_name) AS manager
			FROM employee AS e
			INNER JOIN role AS r
			ON e.role_id = r.id
			INNER JOIN department AS d
			ON r.department_id = d.id
			LEFT JOIN employee AS e2
			ON e.manager_id = e2.id;
			`;
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve(['No employees found']);
				resolve(result);
			});
		});

	getManagers = () =>
		new Promise(function (resolve, reject) {
			const sql = `
			SELECT e.id,  e.first_name, e.last_name, title, name AS department, salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager 		     
			FROM employee AS e
			INNER JOIN role AS r
			ON e.role_id = r.id
			INNER JOIN department AS d
			ON r.department_id = d.id
			LEFT JOIN employee AS e2
			ON e.manager_id = e2.id
			WHERE e.id IN (SELECT e.manager_id		     
			FROM employee AS e
			LEFT JOIN employee AS e2
			ON e.manager_id = e2.id);
			`;
			db.query(sql, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				// if (result.length === 0) resolve(['No managers found']);
				resolve(result);
			});
		});

	getEmployeesByDepartment = (department_id, departmentName) =>
		new Promise(function (resolve, reject) {
			const sql = `
			SELECT e.id, e.first_name, e.last_name, title 
			FROM employee AS e 
			INNER JOIN role AS r 
			ON e.role_id = r.id 
			INNER JOIN department AS d
			ON r.department_id = d.id
			WHERE d.id = ?;
			`;
			const params = department_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve([`No employees found in department ${departmentName}`]);
				resolve(result);
			});
		});

	getEmployeesByManager = (manager_id, managerName) =>
		new Promise(function (resolve, reject) {
			const sql = `
			SELECT e.id, e.first_name, e.last_name, title 
			FROM employee AS e 
			INNER JOIN role AS r 
			ON e.role_id = r.id 
			INNER JOIN department AS d
			ON r.department_id = d.id
			LEFT JOIN employee AS e2
			on e.manager_id = e2.id
			WHERE e.manager_id = ?;
			`;
			const params = manager_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.length === 0) resolve([`No employees found with manager ${managerName}`]);
				resolve(result);
			});
		});

	getTotalUtilizedBudget = (department_id) =>
		new Promise(function (resolve, reject) {
			const sql = `
			SELECT d.name AS 'department', SUM(salary) AS 'total utilized budget'            
			FROM employee AS e
			INNER JOIN role AS r
			ON e.role_id = r.id
			INNER JOIN department AS d
			ON r.department_id = d.id
			WHERE r.department_id = ?;
			`;
			const params = department_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}; sql = ${sql}; params = ${params}`));
				// if (result.length === 0) resolve([`No utilizd budget found for department ${department_id}`]);
				resolve(result);
			});
		});

	addDepartment = (name) =>
		new Promise(function (resolve, reject) {
			const sql = `INSERT INTO department (name)
			VALUES (?);`;
			const params = name;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to add department ${name}`);
				resolve(`Added ${name} to the database`);
			});
		});

	addRole = (title, salary, department_id) =>
		new Promise(function (resolve, reject) {
			const sql = `INSERT INTO role (title, salary, department_id)
			VALUES (?, ?, ?);`;
			const params = [title, salary, department_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to add role ${title}`);
				resolve(`Added ${title} to the database`);
			});
		});

	addEmployee = (first_name, last_name, role_id, manager_id) =>
		new Promise(function (resolve, reject) {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
			VALUES (?, ?, ?, ?);`;
			const params = [first_name, last_name, role_id, manager_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (!result) resolve(`Unable to add employee ${first_name} ${last_name}. SQL = ${sql}`);
				resolve(`Added ${first_name} ${last_name} to the database`);
			});
		});

	updateEmployeeRole = (employee_id, role_id, employeeName, roleName) =>
		new Promise(function (resolve, reject) {
			const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
			const params = [role_id, employee_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find employee ${employee_id} or role ${role_id}`);
				if (result.affectedRows === 1 && result.changedRows === 0) resolve(`Found employee ${employee_id} and role ${role_id} but no change was made`);
				resolve(`Updated ${employeeName}'s role to ${roleName}`);
			});
		});

	updateEmployeeManager = (employee_id, manager_id, employeeName, managerName) =>
		new Promise(function (resolve, reject) {
			const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
			const params = [manager_id, employee_id];
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find employee ${employee_id} or manager ${manager_id}`);
				if (result.affectedRows === 1 && result.changedRows === 0) resolve(`Found employee ${employee_id} and manager ${manager_id} but no change was made`);
				resolve(`Updated ${employeeName}'s manager to ${managerName}`);
			});
		});

	deleteDepartment = (department_id, departmentName) =>
		new Promise(function (resolve, reject) {
			const sql = `DELETE FROM department WHERE id = ?`;
			const params = department_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find department ${departmentName}`);
				resolve(`Deleted ${departmentName} from departments`);
			});
		});

	deleteRole = (role_id, roleName) =>
		new Promise(function (resolve, reject) {
			const sql = `DELETE FROM role WHERE id = ?`;
			const params = role_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find role ${roleName}`);
				resolve(`Deleted ${roleName} from roles`);
			});
		});

	deleteEmployee = (employee_id, employeeName) =>
		new Promise(function (resolve, reject) {
			const sql = `DELETE FROM employee WHERE id = ?`;
			const params = employee_id;
			db.query(sql, params, (err, result) => {
				if (err) reject(new Error(`Check your SQL: ${err}`));
				if (result.affectedRows === 0) resolve(`Unable to find employee ${employeeName}`);
				resolve(`Deleted ${employeeName} from employees`);
			});
		});

	// Disconnect from database
	disconnectDatabase = () => db.end();
}
module.exports = Mysql;
