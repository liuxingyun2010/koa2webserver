var http = require('http')
var Koa = require('koa')
var bodyParser = require('koa-bodyparser')
var onerror = require('koa-onerror')
var helmet = require('koa-helmet')
var logger = require('koa-logger')
var mongoose = require('mongoose')
var views = require('koa-views')
var convert = require('koa-convert')
var koaStatic = require('koa-static-plus')
var db = require('./app/models/db')
var router = require('./app/routers/')
var response = require('./app/middlewares/response')
var responseFilter = require('./app/middlewares/responseFilter')
var port = require('./app/config').port
var cors = require('koa2-cors')

var userRoute = require('./app/routers/user')
var groupRoute = require('./app/routers/group')
var dailyRoute = require('./app/routers/daily')
var staticRoute = require('./app/routers/static')


// 初始化admin用户
var U = require('./app/controllers/user')
U.initUserData()

// 新建实例
const app = new Koa()

onerror(app)

app.use(cors());

app.use(logger())
	.use(bodyParser())
	.use(helmet())
	.use(convert(koaStatic(__dirname + '/views')))
	.use(views(__dirname + '/views', {
		extension: 'html'
	})) // 配置模板文件目录和后缀名
	.use(response).use(responseFilter) // 错误处理

// 加载路由
app.use(userRoute.routes(), userRoute.allowedMethods())
	.use(groupRoute.routes(), userRoute.allowedMethods())
	.use(dailyRoute.routes(), userRoute.allowedMethods())
	.use(staticRoute.routes(), userRoute.allowedMethods())
	

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))