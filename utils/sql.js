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
