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

	addDepartment() {
		return `INSERT INTO department (name)
      VALUES (?);`;
	}

	addRole() {
		return `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?);`;
	}

	addEmployee() {
		return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?);`;
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

	viewAllEmployeesByDepartment() {
		return `SELECT e.id, e.first_name, e.last_name, title 
			FROM employee AS e 
			INNER JOIN role AS r 
			ON e.role_id = r.id 
			INNER JOIN department AS d
			ON r.department_id = d.id
			WHERE d.id = ?;`;
	}

	viewAllEmployeesByManager() {
		return `SELECT e.id, e.first_name, e.last_name, title 
			FROM employee AS e 
			INNER JOIN role AS r 
			ON e.role_id = r.id 
			INNER JOIN department AS d
			ON r.department_id = d.id
			LEFT JOIN employee AS e2
			on e.manager_id = e2.id
			WHERE e.manager_id = ?;`;
	}

	viewTotalUtilizedBudget() {
		return `SELECT d.name, SUM(salary) AS 'total utilized budget'            
		FROM employee AS e
		INNER JOIN role AS r
		ON e.role_id = r.id
		INNER JOIN department AS d
		ON r.department_id = d.id
		WHERE r.department_id = ?;
		`;
	}

	/*
   Update
   */

	updateEmployeeRole() {
		return `UPDATE employee SET role_id = ? WHERE id = ?`;
	}

	updateEmployeeManager() {
		return `UPDATE employee SET manager_id = ? WHERE id = ?`;
	}

	/* 
   Delete
		  */

	deleteDepartment() {
		return `DELETE FROM department WHERE id = ?`;
	}

	deleteRole() {
		return `DELETE FROM role WHERE id = ?`;
	}

	deleteEmployee() {
		return `DELETE FROM employee WHERE id = ?`;
	}
}
module.exports = SQL;
