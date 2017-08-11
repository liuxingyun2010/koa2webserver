/*
 * @ use 统一try catch处理中间件
 * @ 用于捕获内部错误，输出日志信息
 */
const tracer = require('tracer');
const logger = tracer.colorConsole({
    level: 'error',
    format: '{{timestamp}} <{{title}}> {{file}}(#{{line}}): {{message}}',
    file: 'error.log',
    path: __dirname
});
export default async(ctx, next) => {
    try {
        await next();
    } catch (err) {
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
        
        logger.error(err.stack)

        if(err.status === 401){
            return ctx.error({
                msg: '用户未授权',
                code: -2,
                status: ctx.status
            })
        }

        return ctx.error({
            msg: '服务器错误!',
            error: err,
            status: ctx.status
        })
    }
}