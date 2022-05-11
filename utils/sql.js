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

	/*
   Read
   */

	/*
   Update
   */

	/* 
   Delete
   */
}
module.exports = SQL;
