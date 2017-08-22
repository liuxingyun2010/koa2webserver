var jwt = require('jsonwebtoken')
var jwtKey = require('../config').jwtKey
var User = require('../models/user')
var md5 = require('md5')

module.exports = async (ctx) => {
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
        id: findUser._id,
        gid: findUser.gid,
        username: username,
        nickname: findUser.nickname,
        role: findUser.role
    }, jwtKey)

    // ctx.cookies.set('_app_token_', token, { maxAge: keep_user, httpOnly: false })

    return ctx.success({
        data: {
            token: token,
            role: findUser.role
        },
        msg: '登录成功'
    })

}