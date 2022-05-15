/*
 * Employee Management System
 * mysql2.js
 * this file contains SQL queries that are send to the database
 * Copyright 2022 Leo Wong
 */

// import connection
const { db } = require('../config/connection');

// utility file to format console messages
const { red, white, green } = require('./utils/chalkRender');

// static helper functions to log errors with sql
const sqlErr = (sql, err) => red(`Check your SQL: ${sql}\n${err}\n`);

// static helper functions to log errors with sql and params
const sqlParamsErr = (sql, params, err) => red(`Check your SQL: ${sql}\n${JSON.stringify(params)}\n${err}\n`);

sqlGetDepartments = () =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT id, name AS department 
							 	FROM department;`;
		db.query(sql, (err, result) => (err ? reject(new Error(sqlErr(sql, err))) : result.length === 0 ? reject(red('No departments found')) : resolve(result)));
	});

sqlGetRoles = () =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT r.id, r.title, d.name AS department, r.salary
								FROM role AS r
								INNER JOIN department AS d
									ON r.department_id = d.id;`;
		db.query(sql, (err, result) => (err ? reject(sqlErr(sql, err)) : result.length === 0 ? reject(red('No roles found')) : resolve(result)));
	});

sqlGetEmployees = () =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, 
								CONCAT(e2.first_name,' ',e2.last_name) AS manager
								FROM employee AS e
								INNER JOIN role AS r
									ON e.role_id = r.id
								INNER JOIN department AS d
									ON r.department_id = d.id
								LEFT JOIN employee AS e2
									ON e.manager_id = e2.id;`;
		db.query(sql, (err, result) => (err ? reject(sqlErr(sql, err)) : result.length === 0 ? reject(red('No employees found')) : resolve(result)));
	});

sqlGetManagers = () =>
	new Promise(function (resolve, reject) {
		const sql = ` 	SELECT e.id,  e.first_name, e.last_name, title, name AS department, salary, 
									CONCAT(e2.first_name,' ',e2.last_name) AS manager 		     
								FROM employee AS e
								INNER JOIN role AS r
									ON e.role_id = r.id
								INNER JOIN department AS d
									ON r.department_id = d.id
								LEFT JOIN employee AS e2
									ON e.manager_id = e2.id
								WHERE e.id IN (
									SELECT e.manager_id		     
									FROM employee AS e
									LEFT JOIN employee AS e2
										ON e.manager_id = e2.id
								);`;
		db.query(sql, (err, result) => (err ? reject(sqlErr(sql, err)) : result.length === 0 ? reject(red('No managers found')) : resolve(result)));
	});

sqlGetEmployeesByDepartment = (dId, dName) =>
	new Promise(function (resolve, reject) {
		const sql = `	SELECT e.id, e.first_name, e.last_name, title 
								FROM employee AS e 
								INNER JOIN role AS r 
									ON e.role_id = r.id 
								INNER JOIN department AS d
									ON r.department_id = d.id
								WHERE d.id = ?;`;
		const params = dId;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.length === 0 ? reject(red(`No employees found in department ${dName}`)) : resolve(result)));
	});

sqlGetEmployeesByManager = (mId, mName) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	SELECT e.id, e.first_name, e.last_name, title 
								FROM employee AS e 
								INNER JOIN role AS r 
									ON e.role_id = r.id 
								INNER JOIN department AS d
									ON r.department_id = d.id
								LEFT JOIN employee AS e2
									ON e.manager_id = e2.id
								WHERE e.manager_id = ?;`;
		const params = mId;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.length === 0 ? reject(red(`No employees found with manager ${mName}`)) : resolve(result)));
	});

sqlGetTotalUtilizedBudget = (dId, dName) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	SELECT d.name AS 'department', SUM(salary) AS 'total utilized budget'            
								FROM employee AS e
								INNER JOIN role AS r
									ON e.role_id = r.id
								INNER JOIN department AS d
									ON r.department_id = d.id
								WHERE r.department_id = ?;`;
		const params = dId;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result[0].department === null ? reject(red(`No budget found for department ${dName}`)) : resolve(result)));
	});

sqlAddDepartment = (dName) =>
	new Promise(function (resolve, reject) {
		const sql = `	INSERT INTO department (name)
								VALUES (?);`;
		const params = dName;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to add department ${dName}`)) : resolve(green(`Added ${dName} to the database`))));
	});

sqlAddRole = (roleTitle, roleSalary, departmentId) =>
	new Promise(function (resolve, reject) {
		const sql = `	INSERT INTO role (title, salary, department_id)
								VALUES (?, ?, ?);`;
		const params = [roleTitle, roleSalary, departmentId];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to add role ${roleTitle}`)) : resolve(green(`Added ${roleTitle} to the database`))));
	});

sqlAddEmployee = (first_name, last_name, role_id, manager_id) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	INSERT INTO employee (first_name, last_name, role_id, manager_id)
								VALUES (?, ?, ?, ?);`;
		const params = [first_name, last_name, role_id, manager_id];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to add employee ${first_name} ${last_name}`)) : resolve(green(`Added ${first_name} ${last_name} to the database`))));
	});

sqlUpdateEmployeeRole = (employee_id, role_id, employeeName, roleName) =>
	new Promise(function (resolve, reject) {
		const sql = ` 	UPDATE employee 
								SET role_id = ? 
								WHERE id = ?`;
		const params = [role_id, employee_id];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find employee ${employee_id} or role ${role_id}`)) : result.changedRows === 0 ? resolve(white(`No changes were made`)) : resolve(green(`Updated ${employeeName}'s role to ${roleName}`))));
	});

sqlUpdateEmployeeManager = (employee_id, manager_id, employeeName, managerName) =>
	new Promise(function (resolve, reject) {
		const sql = `	UPDATE employee
								SET manager_id = ?
								WHERE id = ?`;
		const params = [manager_id, employee_id];
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find either employee ${employeeName} or manager ${managerName}`)) : result.changedRows === 0 ? reject(white(`No changes were made`)) : resolve(green(`Updated ${employeeName}'s manager to ${managerName}`))));
	});

sqlDeleteDepartment = (department_id, departmentName) =>
	new Promise(function (resolve, reject) {
		const sql = `	DELETE FROM department 
								WHERE id = ?`;
		const params = department_id;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find department ${departmentName}`)) : resolve(green(`Deleted ${departmentName} from departments`))));
	});

sqlDeleteRole = (role_id, roleName) =>
	new Promise(function (resolve, reject) {
		const sql = `	DELETE FROM role
								WHERE id = ?`;
		const params = role_id;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find role ${roleName}`)) : resolve(green(`Deleted ${roleName} from roles`))));
	});

sqlDeleteEmployee = (employee_id, employeeName) =>
	new Promise(function (resolve, reject) {
		const sql = `	DELETE FROM employee 
							 	WHERE id = ?`;
		const params = employee_id;
		db.query(sql, params, (err, result) => (err ? reject(sqlParamsErr(sql, params, err)) : result.affectedRows === 0 ? reject(red(`Unable to find employee ${employeeName}`)) : resolve(green(`Deleted ${employeeName} from employees`))));
	});

// Disconnect from database
disconnectDatabase = () => db.end();

module.exports = { sqlGetDepartments, sqlGetRoles, sqlGetEmployees, sqlGetManagers, sqlGetEmployeesByDepartment, sqlGetEmployeesByManager, sqlGetTotalUtilizedBudget, sqlAddDepartment, sqlAddRole, sqlAddEmployee, sqlUpdateEmployeeRole, sqlUpdateEmployeeManager, sqlDeleteDepartment, sqlDeleteRole, sqlDeleteEmployee, disconnectDatabase };
