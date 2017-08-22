var Router = require('koa-router')
var userHandler = require('../controllers/user')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'user'

const router = new Router() 

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router.post('/login', userHandler.login)
	.get('/', jwt, userHandler.findUserAll)
	.get('/:id/group', jwt, userHandler.findUserByGroup)
	.post('/add',jwt, userHandler.addUser)
	.get('/info',jwt, userHandler.findOne)
	.post('/pwd',jwt, userHandler.updatePassword)
	.post('/search',jwt, userHandler.searchUser)
	.get('/test', userHandler.test)



module.exports = router