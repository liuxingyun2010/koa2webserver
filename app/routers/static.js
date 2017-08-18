import Router from 'koa-router'
import { baseApi } from '../config'

const router = new Router() 

router.prefix(`/`)

// 登录接口，返回json web token
router.get('/*', async (ctx) => {
	await ctx.render('index')
})

export default router