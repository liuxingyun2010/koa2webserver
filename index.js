import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import onerror from 'koa-onerror'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import views from 'koa-views'
import convert from 'koa-convert'
import koaStatic from 'koa-static'
import db from './app/models/db'
import router from './app/routers/'
import response from './app/middlewares/response'
import responseFilter from './app/middlewares/responseFilter'
import {
	port
} from './app/config'

// 初始化admin用户
import U from './app/controllers/user'
U.initUserData()

// 新建实例
const app = new Koa()

onerror(app)

app.use(logger())
	.use(bodyParser())
	.use(helmet())
	.use(convert(koaStatic(__dirname + '/views')))
	.use(views(__dirname + '/views', {
		extension: 'html'
	})) // 配置模板文件目录和后缀名
	.use(response).use(responseFilter) // 错误处理

// 加载路由
router(app)

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))