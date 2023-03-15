import Router from 'express'
const router = Router()
import {
  getRoles,
  createRole,
  deleteRole //
} from '../../controllers/index.js'

router //
  .route('/')
  .get(getRoles)
  .post(createRole)

router //
  .route('/:roleId')
  .delete(deleteRole)

export default router
