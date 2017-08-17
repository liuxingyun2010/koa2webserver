import Router from 'koa-router'
import dailyHandler from '../controllers/daily'
import { baseApi } from '../config'
import jwt from '../middlewares/jwt'

const api = 'daily'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router
	.get('/', jwt, dailyHandler.find)
	.post('/add',jwt, dailyHandler.add)
	

export default router