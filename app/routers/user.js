var Router = require('koa-router')
var userHandler = require('../controllers/user')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'user'

const router = new Router() 

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router.post('/login', userHandler.login)
	.get('/', userHandler.findUserAll)
	.get('/:id/group', userHandler.findUserByGroup)
	.post('/add', userHandler.addUser)
	.get('/info', userHandler.findOne)
	.post('/pwd', userHandler.updatePassword)
	.post('/search', userHandler.searchUser)
	.get('/test', userHandler.test)



module.exports = router