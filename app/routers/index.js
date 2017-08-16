import routesLoader from '../utils/routesLoader'
import userRoute from './user'
import groupRoute from './group'



export default function(app) {
	// routesLoader(`${__dirname}`).then((files) => {
	// 	console.log(__dirname)
	// 	files.forEach((route) => {
	// 		app
	// 			.use(route.routes())
	// 			.use(route.allowedMethods({
	// 				throw: true,
	// 			}))
	// 	})
	// })
	app.use(userRoute.routes()).use(userRoute.allowedMethods({
		throw: true,
	}))

	app.use(groupRoute.routes()).use(userRoute.allowedMethods({
		throw: true,
	}))
}