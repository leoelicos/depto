import Router from 'express'
const router = Router()
import {
  getEmployees,
  getEmployeesByDepartment,
  getEmployeesByManager,
  createEmployee,
  updateEmployee,
  deleteEmployee
  //
} from '../../controllers/index.js'

router //
  .route('/')
  .get(getEmployees)
  .post(createEmployee)
  .get(getEmployeesByDepartment) // query department=departmentId
  .get(getEmployeesByManager) // query manager=managerId

router //
  .route('/:employeeId')
  .put(updateEmployee)
  .delete(deleteEmployee)

export default router
