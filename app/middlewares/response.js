/*
* @ use 统一响应请求中间件
* @ error-data 返回错误时，可携带的数据
* @ error-msg  自定义的错误提示信息
* @ error-status 错误返回码
* @ error-errdata 可返回服务器生成的错误
* @ success-data  请求成功时响应的数据
* @ success-msg  请求成功时响应的提示信息
* @ 调用ctx.error()   响应错误
* @ 调用ctx.success()  响应成功
*/ 

export default async (ctx, next) => {
    ctx.error = ({ data, msg, status, error, code = -2 }) => {
       ctx.status = status || 500
       ctx.body = { code, msg, data, error, status};
    }
    ctx.success = ({ data, msg, status }) => {
    	ctx.status = 200
        ctx.body = { code: 1, msg, data, status };
    }
    await next()
}