var Group = require('../models/group')
var User = require('../models/user')
var jwt = require('jsonwebtoken')
var jwtKey = require('../config').jwtKey

class GroupController {
	// 是否有权限操作
	static isAuthOp(ctx){
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _userInfo = jwt.verify(_token, jwtKey)
		
		return _userInfo.role
	}

	// 添加分组
	static async add(ctx) {
		const _role = GroupController.isAuthOp(ctx)

		if(_role !== 1){
			return ctx.error({
				msg: '您没有权限操作此功能'
			})
		}

		const _name = ctx.request.body.name
		if(!_name){
			return ctx.error({
				msg: '分组名不能为空'
			})
		}

		const _findThisGroup = await Group.findOne({name: _name})
		
		if(_findThisGroup){
			return ctx.error({
				msg: '组名已存在，请重新输入'
			})
		}
		
		const addGroup= await new Group(ctx.request.body).save()

		if(!addGroup){
			return ctx.error({
				msg: '添加分组失败'
			})
		}
		
		return ctx.success({
			msg: '添加分组成功'
		})
  	}

	// 查询分组列表
	static async find(ctx) {
		let allGroup = await Group.find({}, 'name count')
		if(allGroup){
			return ctx.success({
				data: {
					group: allGroup
				}
			})
		}else{
			return ctx.error({
				msg: '查询失败'
			})
		}
	}
}

module.exports =  GroupController