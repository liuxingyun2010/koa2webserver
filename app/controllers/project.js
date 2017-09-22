var Project = require('../models/project')
var jwt = require('jsonwebtoken')
var jwtKey = require('../config').jwtKey

class ProjectHandler {
	static init(){
		this.list = this.list.bind(this)
	}
	// 是否有权限操作
	static isAuthOp(ctx){
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _userInfo = jwt.verify(_token, jwtKey)
		
		return _userInfo.role
	}

	// 查询项目列表
	static async list(ctx) { 
		const _status = ctx.query.status || ''
		
		let _selectSql = {}
		if(_status !== 0 && _status !== ''){
			_selectSql.status = _status
		}

		const _list = await Project
			.find(_selectSql, 'name createTime')
			.sort({
				createTime: -1
			})
		
		if(_list){
			return ctx.success({
				data: {
					list: _list
				}
			})
		}
		
		return ctx.success({
			msg: '查询失败'
		})
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
		
		// if(_findThisProject){
		// 	return ctx.error({
		// 		msg: '项目名已存在，请重新输入'
		// 	})
		// }

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
		const _id = ctx.params.id || ''

		if(!_id){
			return ctx.error({
				msg: '参数无效'
			})
		}

		try{
			let _del = await Project.findOneAndUpdate({_id: _id}, {
				status: 3
			})

			return ctx.success({
				msg: '删除成功'
			})
		}catch(e){
			return ctx.error({
				msg: '删除失败'
			})
		}
		
	}

	// 更新项目
	static async update(ctx) {
		const _id = ctx.params.id || '',
			_name = ctx.request.body.name || ''

		if(!_id){
			return ctx.error({
				msg: '参数无效'
			})
		}
		
		if(!_name){
			return ctx.error({
				msg: '修改内容不能为空'
			})
		}
		try{
			let _project = await Project.findOneAndUpdate({_id: _id}, {
				name: _name
			})

			return ctx.success({
				msg: '更新成功'
			})
		}catch(e){
			return ctx.error({
				msg: '更新失败'
			})
		}
	}

	// 归档项目
	static async file(ctx) {
		const _id = ctx.params.id || ''

		if(!_id){
			return ctx.error({
				msg: '参数无效'
			})
		}
		
		try{
			let _file = await Project.findOneAndUpdate({_id: _id}, {
				status: 2
			})

			return ctx.success({
				msg: '归档成功'
			})
		}catch(e){
			return ctx.error({
				msg: '归档失败'
			})
		}
		
	}
}

ProjectHandler.init()

module.exports = ProjectHandler