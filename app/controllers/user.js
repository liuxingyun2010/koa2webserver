import xss from 'xss'
import authenticate from '../middlewares/authenticate'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../config'



class UserController  {
	
	// 登录
	// 验证用户的账号密码
	static async login(ctx){
		authenticate(ctx)
	}


	// 查询
	static async find(ctx) {
		console.log(ctx.header.authorization)
		const token = ctx.header.authorization.split(' ')[1]
		const x = jwt.verify(token, jwtKey)
		
    	// ctx.body = await User.findOne()
    	ctx.body = x
  	}

	// 添加用户
	static async addUser(ctx) {
		// console.log(ctx)
		try {
			const res = await new User(ctx.request.body).save()
			ctx.body = res
		} catch (err) {
			// ctx.throw(422)
			ctx.status = 500
			ctx.body = err
		}
	}
}

export default UserController