import { Router } from 'express'
const router = Router()

import departmentRoutes from './departmentRoutes.js'
import employeeRoutes from './employeeRoutes.js'
import roleRoutes from './roleRoutes.js'
import managerRoutes from './managerRoutes.js'

router.use('/departments', departmentRoutes)
router.use('/employees', employeeRoutes)
router.use('/roles', roleRoutes)
router.use('/managers', managerRoutes)

export default router
