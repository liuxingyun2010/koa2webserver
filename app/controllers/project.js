var Project = require('../models/project')
var jwt = require('jsonwebtoken')
var jwtKey = require('../config').jwtKey

class ProjectHandler {
	// 是否有权限操作
	static isAuthOp(ctx){
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _userInfo = jwt.verify(_token, jwtKey)
		
		return _userInfo.role
	}

	// 查询项目列表
	static async list(ctx) { 
		console.log(ctx)
	}

	// 添加项目
	static async add(ctx) {
		const _role = ProjectHandler.isAuthOp(ctx)

		if(_role !== 1){
			return ctx.error({
				msg: '您没有权限操作此功能'
			})
		}

		const _name = ctx.request.body.name

		if(!_name){
			return ctx.error({
				msg: '项目名不能为空'
			})
		}

		const _findThisProject = await Project.findOne({name: _name})
		
		if(_findThisProject){
			return ctx.error({
				msg: '项目名已存在，请重新输入'
			})
		}
		
		const addProject= await new Project(ctx.request.body).save()

		if(!addProject){
			return ctx.error({
				msg: '添加项目失败'
			})
		}
		
		return ctx.success({
			msg: '添加项目成功'
		})
  	}

	// 删除项目
	static async del(ctx) {
		// let allGroup = await Project.find({}, 'name count')
		// if(allGroup){
		// 	return ctx.success({
		// 		data: {
		// 			group: allGroup
		// 		}
		// 	})
		// }else{
		// 	return ctx.error({
		// 		msg: '查询失败'
		// 	})
		// }
	}

	// 更新项目
	static async update(ctx) {
		
	}
}

module.exports = ProjectHandler