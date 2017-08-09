import Router from 'koa-router'
import userHandler from '../controllers/user'
import { baseApi } from '../config'

const api = 'user'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.get('/', userHandler.find)

router.post('/add', userHandler.addUser)


export default router