import jwt from 'jsonwebtoken'
import { jwtKey } from './config'

export default (ctx) => {
    if (ctx.request.body.password === 'password') {
        ctx.status = 200;
        ctx.body = {
            data: {
                token: jwt.sign({
                    uid: 'admin',
                    nickname: 'xxx' 
                }, 'jwtKey')
            },
            msg: '登录成功',
        };
    } else {
        ctx.status = 401;
        ctx.body = {
            data: null,
            msg: '登录失败，账号或者密码不正确',
        };
    }
    return ctx;
}