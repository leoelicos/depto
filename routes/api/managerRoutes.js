import Router from 'express'
const router = Router()
import {
  getManagers
  //
} from '../../controllers/index.js'

router //
  .route('/')
  .get(getManagers)

export default router
