import jwt from 'jsonwebtoken'
import { jwtKey } from '../config'

export default (ctx) => {
    if (ctx.request.body.password === 'password') {
        return ctx.success({
            data: {
                token: jwt.sign({
                    name: 'hello koa'
                }, jwtKey)
            },
            msg: '登录成功',
        })
    } else {
        return ctx.error({
            msg: '登录失败，账号或者密码不正确',
        })
    }
}