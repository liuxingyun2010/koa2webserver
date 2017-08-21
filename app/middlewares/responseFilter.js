/*
 * @ use 统一try catch处理中间件
 * @ 用于捕获内部错误，输出日志信息
 */
var logUtil = require('../logsConfig/log_util')

module.exports = async(ctx, next) => {
    const start = new Date();
    var ms
    
    try {
        await next();

        ms = new Date() - start;

        //记录响应日志
        logUtil.logResponse(ctx, ms);

    } catch (err) {
        ms = new Date() - start;

        //记录异常日志
        logUtil.logError(ctx, err, ms);
        
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
        
        if(err.status === 405){
            return ctx.error({
                msg: '请求方式错误'
            })
        }
        
        return ctx.error({
            code: 0,
            msg: err
        })
    }
}