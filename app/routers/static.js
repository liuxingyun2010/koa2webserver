var Router = require('koa-router')
var baseApi = require('../config')

const router = new Router() 

router.prefix(`/`)

// 登录接口，返回json web token
router.get('/x', async (ctx) => {
	await ctx.render('index')
})

module.exports = router