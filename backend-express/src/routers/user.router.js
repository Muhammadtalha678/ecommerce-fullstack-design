import express from 'express'
import { authenticateUser } from '../middlewares/authentication.middleware'
import { sendResponse } from '../helpers/sendResponse.js'

const routers = express.Router()

routers.get('/userInfo', authenticateUser, async (req, res) => {
    try {
        const {fullname,email,role} = req.body
        sendResponse(res, 200, false, {},{fullname,email,role})
    } catch (error) {
        
        sendResponse(res, 500, true, {general:"Something went wrong"},null)
    }
})