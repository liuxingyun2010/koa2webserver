import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import mongoose from 'mongoose'
import views from 'koa-views'
import router from './app/routers/'
import { port, connectString } from './app/config'

const dbConfig = {useMongoClient: true}
// mongoose.createConnection(connectString, dbConfig)
mongoose.connect(connectString)
mongoose.connection.on('error', console.error)


const app = new Koa()

app.use(logger())
  .use(bodyParser())
  .use(helmet())

// 配置模板文件目录和后缀名
app.use(views(__dirname + '/views', {
  // extension: 'ejs'
}))

// 加载路由
router(app)

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))