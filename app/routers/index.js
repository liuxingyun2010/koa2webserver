var userRoute = require('./user')
var groupRoute = require('./group')
var dailyRoute = require('./daily')
var projectRoute = require('./project')


module.exports = (app) => {
	app.use(userRoute.routes())
		.use(userRoute.allowedMethods({
			throw: true,
		}))

	app.use(groupRoute.routes())
		.use(groupRoute.allowedMethods({
			throw: true,
		}))

	app.use(dailyRoute.routes())
		.use(dailyRoute.allowedMethods({
			throw: true,
		}))

	app.use(projectRoute.routes())
		.use(projectRoute.allowedMethods({
			throw: true,
		}))
}