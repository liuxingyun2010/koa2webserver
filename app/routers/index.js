import routesLoader from '../utils/routesLoader'
import userRoute from './user'
import groupRoute from './group'
import dailyRoute from './daily'
import testRoute from './static'


export default function(app) {
	app
		.use(userRoute.routes())
		.use(groupRoute.routes())
		.use(dailyRoute.routes())
		.use(testRoute.routes())
		.use(userRoute.allowedMethods({
			throw: true,
		}))
}