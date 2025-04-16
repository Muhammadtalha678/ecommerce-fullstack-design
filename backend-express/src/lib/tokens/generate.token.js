import jwt from 'jsonwebtoken'
import {env} from '../configs/env.config.js'
const generateAccessToken = (payload) => {
    return jwt.sign(payload,env.AUTH_SECRET,{expiresIn:'1d'})
}
const generateRefreshToken = (payload) => {
    return jwt.sign(payload,env.REFRESH_SECRET,{expiresIn:'7d'})
}
export {generateAccessToken,generateRefreshToken}