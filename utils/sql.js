/* 
 SQL.js
 
 this file contains SQL CRUD queries

 Copyright Leo Wong 2022
 */

class SQL {
	//
	constructor() {}

	/* 
   Create
   */

	addDepartment(department_name) {
		return `INSERT INTO department (name)
      VALUES ("${department_name}");`;
	}

	addRole(role_title, role_salary, department_id) {
		return `INSERT INTO role (title, salary, department_id)
      VALUES ("${role_title}", ${role_salary}, ${department_id});`;
	}

	addEmployee(first_name, last_name, role_id, manager_id) {
		return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id});`;
	}

	/*
   Read
   */

	viewAllDepartments() {
		return `SELECT id, name AS department 
      FROM department;`;
	}

	viewAllRoles() {
		return `SELECT r.id, r.title, d.name AS department, r.salary
			FROM role AS r
			JOIN department AS d
			ON r.department_id = d.id;`;
	}

	viewAllEmployees() {
		return `SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager 
      FROM employee AS e 
      INNER JOIN role AS r 
      ON e.role_id = r.id 
      INNER JOIN department AS d
      ON r.department_id = d.id
      LEFT JOIN employee AS e2
      on e.manager_id = e2.id;`;
	}

	viewAllEmployeesByDepartment(department_id) {
		return `SELECT e.id, e.first_name, e.last_name, title 
			FROM employee AS e 
			INNER JOIN role AS r 
			ON e.role_id = r.id 
			INNER JOIN department AS d
			ON r.department_id = d.id
			LEFT JOIN employee AS e2
			on e.manager_id = e2.id
			WHERE d.id = ${department_id};`;
	}

	/*
   Update
   */

	/* 
   Delete
   */
}
module.exports = SQL;
