import xss from 'xss'
import authenticate from '../middlewares/authenticate'
import User from '../models/user'
import Group from '../models/group'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../config'
import md5 from 'md5'
 
class UserController  {
	
	// 初始化用户数据
	static async initUserData(ctx){
		const _isHasAdmin = await User.findOne({username: 'admin'})
		if(!_isHasAdmin){
			await User.remove()
			const _userInfo = {
				username: 'admin',
				nickname: '管理员',
				password: md5('123456'),
				role: 1
			}
			await User.create(_userInfo)
		}
	}

	// 登录
	// 验证用户的账号密码
	static async login(ctx){
		return authenticate(ctx)
	}

	// 查询
	static async findUserByGroup(ctx) {
		const _group = ctx.request

		console.log(_group)
		// 过滤管理员
    	const _userList = await User.find({role: {$ne: 1}}, 'username nickname role gid')

		if(_userList){
			return ctx.success({
				data: {
					userList: _userList
				}
			})
		}

		return ctx.error({
			msg: '查询失败'
		})
  	}

  	// 查询单个用户信息
	static async findOne(ctx) {
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _tokenInfo = jwt.verify(_token, jwtKey)
    	const _userInfo = await User.findOne({_id: _tokenInfo.id}, 'gid nickname role')
		if(_userInfo){
			// 如果有分组id则进行查询，否则不查询
			const _group = _userInfo.gid? await Group.findById(_userInfo.gid, 'name'): null

			return ctx.success({
				data: {
					userInfo: {
						uid: _userInfo._id,
						gid: _userInfo.gid,
						nickname: _userInfo.nickname,
						groupName: _group? _group.name: '',
						role: _userInfo.role
					}
				}
			})
		}

		return ctx.error({
			msg: '查询失败'
		})
  	}

	// 添加用户
	static async addUser(ctx) {
		const _username = ctx.request.body.username,
			_password = ctx.request.body.password,
			_gid = ctx.request.body.gid,
			_nickname = ctx.request.body.nickname

		if(!_username){
			return ctx.error({
				msg: '用户名不能为空'
			})
		}

		if(!_password){
			return ctx.error({
				msg: '密码不能为空'
			})
		}

		if(!_gid){
			return ctx.error({
				msg: '分组不能为空'
			})
		}

		if(!_nickname){
			return ctx.error({
				msg: '昵称不能为空'
			})
		}

		const _findUser = await User.findOne({username: _username})

		if(_findUser){
			return ctx.error({
				msg: '登录帐号已存在'
			})
		}
		
		const _addUser = await User.create({username: _username, password: md5(_password), gid: _gid, nickname: _nickname})
		
		if(_addUser){
			// 每次添加用户，用户组中的个数都会加1
			let _groupInfo = await Group.findOne({_id: _gid})
			
			await Group.update({_id: _gid}, {$set: {count: ++_groupInfo.count}})

			return ctx.success({
				msg: '用户添加成功'
			})
		}

		return ctx.error({
			msg: '用户添加失败'
		})
	}

	// 根据分组查询用户列表
	static async findUserByGroup(ctx){
		
	}
}


export default UserController