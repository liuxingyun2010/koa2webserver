var Router = require('koa-router')
var groupHandler = require('../controllers/group')
var baseApi = require('../config').baseApi
var jwt = require('../middlewares/jwt')

const api = 'group'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router
	.get('/', jwt, groupHandler.find)
	.post('/add',jwt, groupHandler.add)
	
module.exports = router