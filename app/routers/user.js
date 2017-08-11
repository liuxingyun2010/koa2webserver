import Router from 'koa-router'
import userHandler from '../controllers/user'
import { baseApi } from '../config'
import jwt from '../middlewares/jwt'

const api = 'user'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router.post('/login', userHandler.login)
	.get('/', jwt, userHandler.find)
	.post('/add', jwt, userHandler.addUser)

export default router