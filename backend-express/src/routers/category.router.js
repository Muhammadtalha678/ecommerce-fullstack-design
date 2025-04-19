import express from 'express'
import { authenticateUser } from '../middlewares/authentication.middleware.js'
import { authorizeAdmin } from '../middlewares/authorizeAdmin.middleware.js'

const router = express.Router()

router.post('/addCategory', authenticateUser, authorizeAdmin)

export default router