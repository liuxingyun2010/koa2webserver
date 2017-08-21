var routesLoader = require('../utils/routesLoader')
var userRoute = require('./user')
var groupRoute = require('./group')
var dailyRoute = require('./daily')
var testRoute = require('./static')


module.exports = function(app) {
	app
		.use(userRoute.routes())
		.use(groupRoute.routes())
		.use(dailyRoute.routes())
		.use(testRoute.routes())
		.use(userRoute.allowedMethods({
			throw: true,
		}))
}