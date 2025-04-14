import express from 'express'
import { authenticateUser } from '../middlewares/authentication.middleware.js'
import { userController } from '../controllers/user.controller.js'

const routers = express.Router()

routers.get('/userInfo', authenticateUser, userController)

export default routers