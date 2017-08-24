var userRoute = require('./user')
var groupRoute = require('./group')
var dailyRoute = require('./daily')

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
}