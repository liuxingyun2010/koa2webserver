var Router = require('koa-router')
var dailyHandler = require('../controllers/daily')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'daily'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router
	.post('/add',jwt, dailyHandler.add)
	.get('/info/:date?/:uid?',jwt, dailyHandler.dailyInfo)
	.get('/list/:gid/:date?',jwt, dailyHandler.dailyList)
	.put('/update/:id',jwt, dailyHandler.dailyUpdate)
	.del('/remove/:id',jwt, dailyHandler.dailyRemove)
	.get('/user/:pageNum/:uid?',jwt, dailyHandler.dailyListByUser)
	.get('/dashboard/:uid?',jwt, dailyHandler.dailyDashBoard)

module.exports = router