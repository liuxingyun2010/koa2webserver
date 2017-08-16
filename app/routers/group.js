import Router from 'koa-router'
import groupHandler from '../controllers/group'
import { baseApi } from '../config'
import jwt from '../middlewares/jwt'

const api = 'group'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router.post('/add',jwt, groupHandler.add)
	.get('/', jwt, groupHandler.find)

export default router