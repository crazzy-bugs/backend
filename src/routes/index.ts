import { Router } from 'express'
import userRoutes from './user'
import exampleRoutes from './example'

const router = Router()

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

router.use('/users', userRoutes)
router.use('/test',exampleRoutes)

export default router
