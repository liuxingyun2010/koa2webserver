import jwt from 'jsonwebtoken'
import { jwtKey } from '../config'
import User from '../models/user'
import md5 from 'md5'

export default async (ctx) => {
    const username = ctx.request.body.username,
        password = ctx.request.body.password
    
    // 验证参数是否正确或者缺失
    if(!username){
        return ctx.error({
            msg: 'username不能为空'
        })
    }

    if(!password){
        return ctx.error({
            msg: 'password不能为空'
        })
    }
    
    // 查找用户，第一步验证用户名
    const findUser = await User.findOne({
        username,
        password: md5(password)
    })

    if(!findUser){
        return ctx.error({
            msg: '用户名或者密码不正确'
        })
    }
    
    const keep_user = 604800000*54; //一年
    const token = jwt.sign({
        username: username
    }, jwtKey)

    ctx.cookies.set('_app_token_', token, { maxAge: keep_user, httpOnly: false })

    return ctx.success({
        data: {
            token: token
        },
        msg: '登录成功'
    })

}