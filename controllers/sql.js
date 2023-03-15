import db from '../config/connection.js'

const promiseQuery = ({ sql, params }) => {
  sql = sql.replace(/[ ]*[\n\t]+[ ]*/g, ' ')
  console.log({ sql, params })
  return new Promise((resolve, reject) =>
    !params //
      ? db.query(sql, (err, result) => (err ? reject(err) : resolve(result)))
      : db.query(sql, params, (err, result) => (err ? reject(err) : resolve(result)))
  )
}

export const sqlCreateDepartment = ({ departmentName }) =>
  promiseQuery({
    sql: `INSERT INTO department (name)
          VALUES (?);`,
    params: departmentName
  })

export const sqlCreateEmployee = ({ firstName, lastName, roleId, managerId }) => {
  return promiseQuery({
    sql: `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?);`,
    params: [firstName, lastName, roleId, managerId]
  })
}

export const sqlAddRole = ({ roleTitle, roleSalary, departmentId }) =>
  promiseQuery({
    sql: `INSERT INTO role (title, salary, department_id)
          VALUES (?, ?, ?);`,
    params: [roleTitle, roleSalary, departmentId]
  })

export const sqlDeleteDepartment = ({ departmentId }) =>
  promiseQuery({
    sql: `DELETE FROM department 
          WHERE id = ?`,
    params: departmentId
  })

export const sqlDeleteEmployee = ({ employeeId }) =>
  promiseQuery({
    sql: `DELETE FROM employee 
          WHERE id = ?`,
    params: employeeId
  })

export const sqlDeleteRole = ({ roleId }) =>
  promiseQuery({
    sql: `DELETE FROM role
          WHERE id = ?`,
    params: roleId
  })

export const sqlGetDepartmentBudget = ({ departmentId }) =>
  promiseQuery({
    sql: `SELECT d.name AS 'department', SUM(salary) AS 'total utilized budget'            
          FROM employee AS e
          INNER JOIN role AS r
          ON e.role_id = r.id
          INNER JOIN department AS d
          ON r.department_id = d.id
          WHERE r.department_id = ?;`,
    params: departmentId
  })

export const sqlGetDepartments = () =>
  promiseQuery({
    sql: `SELECT id, name AS department 
          FROM department
          ORDER BY id;`
  })

export const sqlGetEmployees = () =>
  promiseQuery({
    sql: `SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, 
  CONCAT(e2.first_name,' ',e2.last_name) AS manager
  FROM employee AS e
  INNER JOIN role AS r
  ON e.role_id = r.id
  INNER JOIN department AS d
  ON r.department_id = d.id
  LEFT JOIN employee AS e2
  ON e.manager_id = e2.id
  ORDER BY e.id 
  ;
`
  })

export const sqlGetEmployeesByDepartment = ({ departmentId }) =>
  promiseQuery({
    sql: `SELECT e.id, e.first_name, e.last_name, title 
          FROM employee AS e 
          INNER JOIN role AS r 
          ON e.role_id = r.id 
          INNER JOIN department AS d
          ON r.department_id = d.id
          WHERE d.id = ?;`,
    params: departmentId
  })

export const sqlGetEmployeesByManager = ({ managerId }) =>
  promiseQuery({
    sql: `SELECT e.id, e.first_name, e.last_name, title 
          FROM employee AS e 
          INNER JOIN role AS r 
          ON e.role_id = r.id 
          INNER JOIN department AS d
          ON r.department_id = d.id
          LEFT JOIN employee AS e2
          ON e.manager_id = e2.id
          WHERE e.manager_id = ?;`,
    params: managerId
  })

export const sqlGetEmployeesByDepartmentAndManager = ({ departmentId, managerId }) =>
  promiseQuery({
    sql: `SELECT e.id, e.first_name, e.last_name, title 
          FROM employee AS e 
          INNER JOIN role AS r 
          ON e.role_id = r.id 
          INNER JOIN department AS d
          ON r.department_id = d.id
          LEFT JOIN employee AS e2
          ON e.manager_id = e2.id
          WHERE d.id = ? AND e.manager_id = ?;`,
    params: [departmentId, managerId]
  })

export const sqlGetManagers = () =>
  promiseQuery({
    sql: `SELECT e.id,  e.first_name, e.last_name, title, name AS department, salary, CONCAT(e2.first_name,' ',e2.last_name) AS manager		     
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
          ON e.manager_id = e2.id);`
  })

export const sqlGetRoles = () =>
  promiseQuery({
    sql: `SELECT r.id, r.title, d.name AS department, r.salary
          FROM role AS r
          INNER JOIN department AS d
          ON r.department_id = d.id
          ORDER BY r.id;`
  })

export const sqlUpdateEmployee = ({ managerId, roleId, firstName, lastName, employeeId }) =>
  promiseQuery({
    sql: `UPDATE employee
          SET manager_id = ?, role_id = ?, first_name = ?, last_name=?
          WHERE id = ?`,
    params: [managerId, roleId, firstName, lastName, employeeId]
  })
