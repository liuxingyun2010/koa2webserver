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

// 初始化admin用户
var U = require('./app/controllers/user')
U.initUserData()

// 新建实例
const app = new Koa()

onerror(app)
app.use(cors({
	origin: function(ctx) {
		if (ctx.url === '/test') {
			return false;
		}
		return '*';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(logger())
	.use(bodyParser())
	.use(helmet())
	// .use(convert(koaStatic(__dirname + '/views')))
	// .use(views(__dirname + '/views', {
	// 	extension: 'html'
	// })) // 配置模板文件目录和后缀名
	.use(response).use(responseFilter) // 错误处理

// 加载路由
// router(app) 
app.use(router)

const server = http.createServer(app.callback())

server.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))