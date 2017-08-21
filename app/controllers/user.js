var authenticate = require('../middlewares/authenticate')
var User = require('../models/user')
var Group = require('../models/group')
var jwt = require('jsonwebtoken')
var jwtKey = require('../config').jwtKey
var md5 = require('md5')

class UserController {

	// 是否有权限操作
	static isAuthOp(ctx) {
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _userInfo = jwt.verify(_token, jwtKey)

		return _userInfo.role
	}

	// 初始化用户数据
	static async initUserData(ctx) {
		const _isHasAdmin = await User.findOne({
			username: 'admin'
		})
		if (!_isHasAdmin) {
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
	static async login(ctx) {
		return authenticate(ctx)
	}

	// 查询
	static async findUserAll(ctx) {
		// 过滤管理员
		const _userList = await User.find({
			role: {
				$ne: 1
			}
		}, 'username nickname role gid')

		if (_userList) {
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

	// 分组查询用户列表
	static async findUserByGroup(ctx) {
		const _id = ctx.params.id
		if (!_id) {
			return ctx.error({
				msg: '分组id不能为空'
			})
		}

		const _userList = await User.find({
			gid: _id
		}, 'username nickname role gid')

		if (!_userList) {
			return ctx.error({
				msg: '查询失败'
			})
		}
		return ctx.success({
			data: {
				userList: _userList
			}
		})

	}

	// 查询单个用户信息
	static async findOne(ctx) {
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _tokenInfo = jwt.verify(_token, jwtKey)
		const _userInfo = await User.findOne({
			_id: _tokenInfo.id
		}, 'gid nickname role')
		if (_userInfo) {
			// 如果有分组id则进行查询，否则不查询
			const _group = _userInfo.gid ? await Group.findById(_userInfo.gid, 'name') : null

			return ctx.success({
				data: {
					userInfo: {
						uid: _userInfo._id,
						gid: _userInfo.gid,
						nickname: _userInfo.nickname,
						groupName: _group ? _group.name : '',
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
		const _role = UserController.isAuthOp(ctx)

		if (_role !== 1) {
			return ctx.error({
				msg: '您没有权限操作此功能'
			})
		}

		const _username = ctx.request.body.username,
			_password = ctx.request.body.password,
			_gid = ctx.request.body.gid,
			_nickname = ctx.request.body.nickname

		if (!_username) {
			return ctx.error({
				msg: '用户名不能为空'
			})
		}

		if (!_password) {
			return ctx.error({
				msg: '密码不能为空'
			})
		}

		if (!_gid) {
			return ctx.error({
				msg: '分组不能为空'
			})
		}

		if (!_nickname) {
			return ctx.error({
				msg: '昵称不能为空'
			})
		}

		const _findUser = await User.findOne({
			username: _username
		})

		if (_findUser) {
			return ctx.error({
				msg: '登录帐号已存在'
			})
		}

		const _addUser = await User.create({
			username: _username,
			password: md5(_password),
			gid: _gid,
			nickname: _nickname
		})

		if (_addUser) {
			// 每次添加用户，用户组中的个数都会加1
			let _groupInfo = await Group.findOne({
				_id: _gid
			})

			await Group.update({
				_id: _gid
			}, {
				$inc: {
					count: 1
				}
			})

			return ctx.success({
				msg: '用户添加成功'
			})
		}

		return ctx.error({
			msg: '用户添加失败'
		})
	}

	// 修改密码
	static async updatePassword(ctx) {
		// PUT
		const _oldPassword = ctx.request.body.oldPassword,
			_newPassword = ctx.request.body.newPassword

		if (!_oldPassword) {
			return ctx.error({
				msg: '原密码不能为空'
			})
		}

		if (!_newPassword) {
			return ctx.error({
				msg: '新密码不能为空'
			})
		}

		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _tokenInfo = jwt.verify(_token, jwtKey)

		// 获取老密码
		const _userInfo = await User.findOne({
			_id: _tokenInfo.id
		}, 'password')

		if (_userInfo) {
			if (_userInfo.password !== md5(_oldPassword)) {
				return ctx.error({
					msg: '原密码不正确'
				})
			}

			await User.findOneAndUpdate({
				_id: _tokenInfo.id
			}, {
				$set: {
					password: md5(_newPassword)
				}
			})

			return ctx.success({
				msg: '修改成功'
			})
		}
		return ctx.error({
			msg: '密码修改失败'
		})
	}

	// 用户搜索
	static async searchUser(ctx) {
		const _search = ctx.request.body.keyword

		if (!_search) {
			return ctx.error({
				msg: '搜索内容不能为空'
			})
		}

		const _reg = new RegExp(`${_search}`, 'gi')

		const _userList = await User.find({
				nickname: {
					$regex: _reg
				}
			}, 'nickname gid')
			.populate('gid','name') 

		return ctx.success({
			data: {
				userList: _userList
			}
		})
	}
}


module.exports =  UserController