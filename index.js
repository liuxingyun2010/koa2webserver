import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import onerror from 'koa-onerror'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import mongoose from 'mongoose'
import views from 'koa-views'
import router from './app/routers/'
import log4js from 'koa-log4'
import { port, connectString } from './app/config'

const dbConfig = {useMongoClient: true}
mongoose.connect(connectString, dbConfig)
mongoose.connection.on('error', console.error)


const log = log4js.getLogger('index')
log.info('starting logger')

const app = new Koa()

onerror(app)

app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))
	.use(logger())
  	.use(bodyParser())
 	.use(helmet())

// 配置模板文件目录和后缀名
app.use(views(__dirname + '/views', {
  // extension: 'ejs'
}))

// 加载路由
router(app)

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))