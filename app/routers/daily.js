var Router = require('koa-router')
var dailyHandler = require('../controllers/daily')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'daily'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router
	.post('/add', dailyHandler.add)
	.get('/info/:date?/:uid?', dailyHandler.dailyInfo)
	.get('/list/:gid/:date?', dailyHandler.dailyList)
	.put('/update/:id', dailyHandler.dailyUpdate)
	.del('/remove/:id', dailyHandler.dailyRemove)
	.get('/user/:pageNum/:uid?', dailyHandler.dailyListByUser)
	.get('/dashboard/:uid?', dailyHandler.dailyDashBoard)

module.exports = router


