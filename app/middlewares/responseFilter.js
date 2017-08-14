/*
 * @ use 统一try catch处理中间件
 * @ 用于捕获内部错误，输出日志信息
 */
// const tracer = require('tracer');

// const logger = tracer.colorConsole({
//     level: 'error',
//     format: '{{timestamp}} <{{title}}> {{file}}(#{{line}}): {{message}}',
//     file: 'error.log',
//     path: __dirname
// });
import log4js from 'koa-log4'
const logger = log4js.getLogger('app')
// import logUtil from '../logs/log_util'
export default async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        logger.error(err.stack)
        
        if (!err) {
            return ctx.error({
                msg: new Error('未知错误!')
            });
        }
        if (typeof err === 'string') {
            return ctx.error({
                msg: new Error(err)
            });
        }

        if(err.status === 401){
            return ctx.error({
                msg: '用户未授权',
                code: -1
            })
        }
        
        return ctx.error({
            code: 0
        })
    }
}