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

	/*
   Update
   */

	/* 
   Delete
   */
}
module.exports = SQL;
