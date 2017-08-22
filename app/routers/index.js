var userRoute = require('./user')
var groupRoute = require('./group')
var dailyRoute = require('./daily')
var staticRoute = require('./static')


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
	app
		.use(staticRoute.routes())
		.use(staticRoute.allowedMethods({
			throw: true,
		}))
}


// module.exports = async(ctx, next) => {
// 	//如果是异步接口请求，直接返回json数据
// 	if (ctx.path.match(/^\/api\/user/)) {
// 		return await require('./user').routes()(ctx, next)
// 	}

// 	if (ctx.path.match(/^\/api\/daily/)) {
// 		return await require('./daily').routes()(ctx, next)
// 	}
// 	if (ctx.path.match(/^\/api\/group/)) {
// 		return await require('./group').routes()(ctx, next)
// 	}
// 	//如果页面请求，则调用最终调用ServerRenderCtrl在服务端渲染处理输出
// 	// return await require('./static')(ctx, next);
// 	return ctx.render('index')
// }