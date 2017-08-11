import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import onerror from 'koa-onerror'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import mongoose from 'mongoose'
import views from 'koa-views'
import db from './app/models/db'
import router from './app/routers/'
import log4js from 'koa-log4'
import response from './app/middlewares/response'
import responseFilter from './app/middlewares/responseFilter'
import { port } from './app/config'
// 新建实例
const app = new Koa()

onerror(app)

// 日志，post body处理
app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))
	.use(logger())
  	.use(bodyParser())
 	.use(helmet())

// 配置模板文件目录和后缀名
app.use(views(__dirname + '/views', {
  // extension: 'ejs'
}))

// 错误处理
app.use(response).use(responseFilter)

// 加载路由
router(app)

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))