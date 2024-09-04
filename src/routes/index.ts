import { Router } from 'express'
import userRoutes from './user'
// import exampleRoutes from './example'

const router = Router()

router.use('/user', userRoutes)
// router.use('/test',exampleRoutes)

export default router
