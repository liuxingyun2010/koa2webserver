import Router from 'koa-router'
import groupHandler from '../controllers/group'
import { baseApi } from '../config'
import jwt from '../middlewares/jwt'

const api = 'group'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router
	.get('/', jwt, groupHandler.find)
	.post('/add',jwt, groupHandler.add)
	
export default router