import jwt from 'koa-jwt'
import { jwtKey } from '../config'

export default jwt({
	secret: jwtKey
})