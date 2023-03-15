import {
  sqlCreateDepartment,
  sqlCreateEmployee,
  sqlAddRole,
  sqlDeleteDepartment,
  sqlDeleteEmployee,
  sqlDeleteRole,
  sqlGetDepartmentBudget,
  sqlGetDepartments,
  sqlGetEmployees,
  sqlGetEmployeesByDepartment,
  sqlGetEmployeesByManager,
  sqlGetManagers,
  sqlGetRoles,
  sqlUpdateEmployee, //
  sqlGetEmployeesByDepartmentAndManager
} from './sql.js'

async function promiseHandler(res, cb) {
  try {
    const response = await cb()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'here', error })
  }
}

export const createDepartment = async (req, res) => {
  const { departmentName } = req.body
  const cb = sqlCreateDepartment.bind(null, { departmentName })
  await promiseHandler(res, cb)
}

export const createEmployee = async (req, res) => {
  const { firstName, lastName, roleId, managerId } = req.body
  const cb = sqlCreateEmployee.bind(null, { firstName, lastName, roleId, managerId })
  await promiseHandler(res, cb)
}

export const createRole = async (req, res) => {
  const { roleTitle, roleSalary, departmentId } = req.body
  const cb = sqlAddRole.bind(null, { roleTitle, roleSalary, departmentId })
  await promiseHandler(res, cb)
}

export const deleteDepartment = async (req, res) => {
  const { departmentId } = req.params
  const cb = sqlDeleteDepartment.bind(null, { departmentId })
  await promiseHandler(res, cb)
}

export const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params
  const cb = sqlDeleteEmployee.bind(null, { employeeId })
  await promiseHandler(res, cb)
}

export const deleteRole = async (req, res) => {
  const { roleId } = req.params
  const cb = sqlDeleteRole.bind(null, { roleId })
  await promiseHandler(res, cb)
}

export const getDepartmentBudget = async (req, res) => {
  const { departmentId } = req.params
  const cb = sqlGetDepartmentBudget.bind(null, { departmentId })
  await promiseHandler(res, cb)
}

export const getDepartments = async (req, res) => {
  const cb = sqlGetDepartments
  await promiseHandler(res, cb)
}

export const getEmployees = async (req, res) => {
  const { departmentId, managerId } = req.query

  let cb
  if (departmentId !== undefined && managerId !== undefined) {
    cb = sqlGetEmployeesByDepartmentAndManager.bind(null, { departmentId, managerId })
  } else if (departmentId !== undefined) {
    cb = sqlGetEmployeesByDepartment.bind(null, { departmentId })
  } else if (managerId !== undefined) {
    cb = sqlGetEmployeesByManager.bind(null, { managerId })
  } else {
    cb = sqlGetEmployees
  }
  await promiseHandler(res, cb)
}

export const getManagers = async (req, res) => {
  const cb = sqlGetManagers
  await promiseHandler(res, cb)
}

export const getEmployeesByDepartment = async (req, res) => {
  const { departmentId } = req.params
  const cb = sqlGetEmployeesByDepartment.bind(null, { departmentId })
  await promiseHandler(res, cb)
}

export const getEmployeesByManager = async (req, res) => {
  const { managerId } = req.params
  const cb = sqlGetEmployeesByManager.bind({ managerId })
  await promiseHandler(res, cb)
}

export const getRoles = async (req, res) => {
  const cb = sqlGetRoles
  await promiseHandler(res, cb)
}

export const updateEmployee = async (req, res) => {
  const { employeeId } = req.params
  const { managerId, roleId, firstName, lastName } = req.body
  const cb = sqlUpdateEmployee.bind(null, { employeeId, managerId, roleId, firstName, lastName })
  await promiseHandler(res, cb)
}
