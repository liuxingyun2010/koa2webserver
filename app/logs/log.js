'use strict'
const path = require('path')
const log4js = require('koa-log4')
const logDir = path.join(__dirname, 'logs') //配置目标路径 logs

/*生成logs目录*/
try {
	require('fs').mkdirSync(logDir) //新建目录， ./logs
} catch (err) {
	if (err.code !== 'EEXIST') {
		console.error('Could not set up log directory, error was: ', err)
		process.exit(1)
	}
}

//根据log 配置文件(log4js.json)配置日志文件
log4js.configure(path.join(__dirname, 'log4js.json'), {
	cwd: logDir
})

//注册日志： 日志名（前缀）startup
const logger = log4js.getLogger('startup')

//输入日志
logger.info('logs config finished!')