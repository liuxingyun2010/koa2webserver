var Router = require('koa-router')
var projectHandler = require('../controllers/project.js')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'project'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// 登录接口，返回json web token
router
	.get('/', jwt, projectHandler.list)
	.delete('/:id',jwt, projectHandler.del)
	.patch('/:id',jwt, projectHandler.update)
	.post('/s',jwt, projectHandler.add)


module.exports = router