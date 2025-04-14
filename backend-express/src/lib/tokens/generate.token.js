import jwt from 'jsonwebtoken'
import {env} from '../configs/env.config.js'
const accessToken = (payload) => {
    return jwt.sign(payload,env.AUTH_SECRET,{expiresIn:'15m'})
}
const refreshToken = (payload) => {
    return jwt.sign(payload,env.REFRESH_SECRET,{expiresIn:'7d'})
}
export {accessToken,refreshToken}