import Router from 'express'
const router = Router()
import {
  getDepartments,
  getDepartmentBudget,
  createDepartment,
  deleteDepartment //
} from '../../controllers/index.js'

router //
  .route('/')
  .get(getDepartments)
  .post(createDepartment)

router //
  .route('/:departmentId')
  .get(getDepartmentBudget)
  .delete(deleteDepartment)

export default router
