/*
* @ use 统一响应请求中间件
* @ error-data 返回错误时，可携带的数据
* @ error-msg  自定义的错误提示信息
* @ error-code 错误返回码 -2为用户未授权 -1为普通错误看msg提示
* @ error-errdata 可返回服务器生成的错误
* @ success-data  请求成功时响应的数据
* @ success-msg  请求成功时响应的提示信息
* @ succrss-code 1为返回成功
* @ 调用ctx.error()   响应错误
* @ 调用ctx.success()  响应成功
*/ 
// import log4js from 'koa-log4'
// const logger = log4js.getLogger('app')

export default async (ctx, next) => {
    ctx.error = ({ data, msg, code = 0 }) => {
       	ctx.body = { code, msg, data};
    }

    ctx.success = ({ data, msg }) => {
        ctx.body = { code: 1, msg, data };
    }
    await next()
}