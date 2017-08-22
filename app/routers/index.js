var routesLoader = require('../utils/routesLoader')
var userRoute = require('./user')
var groupRoute = require('./group')
var dailyRoute = require('./daily')
var staticRoute = require('./static')


module.exports = function(app) {
	app
		.use(userRoute.routes())
		.use(userRoute.allowedMethods({
			throw: true,
		}))
	app
		.use(groupRoute.routes())
		.use(groupRoute.allowedMethods({
			throw: true,
		}))
	app
		.use(dailyRoute.routes())
		.use(dailyRoute.allowedMethods({
			throw: true,
		}))
	app
		.use(staticRoute.routes())
		.use(staticRoute.allowedMethods({
			throw: true,
		}))
}