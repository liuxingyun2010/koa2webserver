var path = require('path')
var fs = require('fs')

//日志根目录
var baseLogPath = path.resolve(__dirname, '../../logs')
    //错误日志目录
var errorPath = '/error'
    //错误日志文件名
var errorFileName = 'error'
    //错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + '/' + errorFileName
    //响应日志目录
var responsePath = '/response'
    //响应日志文件名
var responseFileName = 'response'
    //响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + '/' + responseFileName

var logConfig = {
    appenders: {
        out: {
            type: 'console'
        },
        //错误日志
        errorLogger: {
            type: 'dateFile', //日志类型
            filename: errorLogPath, //日志输出位置
            alwaysIncludePattern: true, //是否总是有后缀名
            pattern: '-yyyy-MM-dd.log', //后缀，每小时创建一个新的日志文件
            path: errorPath //自定义属性，错误日志的根目录
        },
        //响应日志
        resLogger: {
            type: 'dateFile',
            filename: responseLogPath,
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log',
            path: responsePath
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info'
        },
        errorLogger: {
            appenders: ['errorLogger'],
            level: 'error'
        },
        resLogger: {
            appenders: ['resLogger'],
            level: 'info'
        },
    }
}


var confirmPath = function(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr)
    }
} 

// 初始化log相关目录
// 创建log的根目录'logs'
var initLogPath = function() {
    if (baseLogPath) {
        confirmPath(baseLogPath)
        //根据不同的logType创建不同的文件目录
        for (var i = 0, len = logConfig.appenders.length; i < len; i++) {
            if (logConfig.appenders[i].path) {
                confirmPath(baseLogPath + logConfig.appenders[i].path)
            }
        }
    }
}

initLogPath()

module.exports = logConfig