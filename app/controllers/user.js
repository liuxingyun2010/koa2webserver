import xss from 'xss'

import User from '../models/user'
class UserController  {

	// 查询
	static async find(ctx) {
    	ctx.body = await User.find()
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