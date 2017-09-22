var Router = require('koa-router')
var projectHandler = require('../controllers/project')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'project'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router
	.get('/', jwt, projectHandler.list)
	.post('/', jwt, projectHandler.add)
	.patch('/:id', jwt, projectHandler.update)
	.patch('/file/:id', jwt, projectHandler.file)
	.del('/:id', jwt, projectHandler.del)
	
module.exports = router