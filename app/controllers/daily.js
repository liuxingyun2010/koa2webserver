var Group = require('../models/group')
var User = require('../models/user')
var Daily = require('../models/daily')
var jwt = require('jsonwebtoken')
var jwtKey = require('../config').jwtKey
var moment = require('moment')

class DailyController {

	static init() {
		this.add = this.add.bind(this)
		this.dailyInfo = this.dailyInfo.bind(this)
		this.dailyList = this.dailyList.bind(this)
		this.dailyUpdate = this.dailyUpdate.bind(this)
		this.dailyRemove = this.dailyRemove.bind(this)
		this.dailyListByUser = this.dailyListByUser.bind(this)
		this.dailyDashBoard = this.dailyDashBoard.bind(this)
	}

	// 是否有权限操作
	static isAuthOp(ctx) {
		const _token = ctx.header.authorization.replace('Bearer ', '')
		const _userInfo = jwt.verify(_token, jwtKey)

		return _userInfo
	}

	// 添加日报
	static async add(ctx) {
		const _record = ctx.request.body.record,
			_progress = ctx.request.body.progress,
			_uid = this.isAuthOp(ctx).id,
			_gid = this.isAuthOp(ctx).gid

		if (!_record) {
			return ctx.error({
				msg: '任务内容不能为空'
			})
		}

		if (!_progress) {
			return ctx.error({
				msg: '任务进度不能为空'
			})
		}

		const _today = moment().format('YYYY-MM-DD')
		const _findDaily = await Daily.findOne({
			uid: _uid,
			day: _today
		})

		let _dailyInfo = {
			record: _record,
			progress: _progress,
		}

		if (_findDaily) {
			const _updateDaily = await Daily.findOneAndUpdate({
				uid: _uid,
				day: _today
			}, {
				$addToSet: {
					'dailyList': _dailyInfo
				}
			})

			if (!_updateDaily) {
				return ctx.error({
					msg: '任务创建失败'
				})
			}

			return ctx.success({
				msg: '添加成功'
			})
		}

		delete _dailyInfo.record
		delete _dailyInfo.progress

		_dailyInfo = {
			uid: _uid,
			day: _today,
			gid: _gid,
			dailyList: [{
				record: _record,
				progress: _progress
			}]
		}

		const _daily = await new Daily(_dailyInfo).save()

		if (_daily) {
			return ctx.success({
				msg: '添加成功'
			})
		}

		return ctx.error({
			msg: '任务创建失败'
		})
	}

	// 查询某人当天日报
	static async dailyInfo(ctx) {
		//daily/info/:date?/:uid?
		const _date = ctx.params.date,
			_uid = ctx.params.uid,
			_myUid = this.isAuthOp(ctx).id

		let _selectSql = {}

		_selectSql.uid = _uid ? _uid : _myUid
		_selectSql.day = _date ? _date : moment().format('YYYY-MM-DD')

		const _info = await Daily
			.findOne(_selectSql, 'uid updateTime dailyList day')
			.populate('uid', 'gid nickname')

		return ctx.success({
			data: {
				dailyInfo: _info || {}
			}
		})
	}

	// 按照日期和分组查询列表数据
	static async dailyList(ctx) {
		//daily/list/:gid/:date?
		let _gid = ctx.params.gid || 'all',
			_date = ctx.params.date,
			_myuid = this.isAuthOp(ctx).id

		let _selectSql = {}

		if (_gid !== 'all') {
			_selectSql.gid = _gid
		}


		let _today = moment()

		const _dayKey = {
			'0': _today.format('YYYY-MM-DD'),
			'1': _today.subtract('1', 'days').format('YYYY-MM-DD'),
			'2': _today.subtract('1', 'days').format('YYYY-MM-DD')
		}

		if (_date == '1' || _date == '2' || _date == '0') {
			_date = _dayKey[_date]
		}

		_selectSql.day = _date ? _date : moment().format('YYYY-MM-DD')
		
		_selectSql.dailyList = {
			$not: {
				$size: 0
			}
		}

		const _list = await Daily
			.find(_selectSql, 'uid updateTime dailyList day')
			.populate('uid', 'gid nickname')
			.sort({
				updateTime: -1
			})

		return ctx.success({
			data: {
				dailyList: _list
			}
		})
	}

	// 获取某个人的日报列表
	static async dailyListByUser(ctx) {
		// daily/user/:id?
		const _pageNum = ctx.params.pageNum || 1,
			_uid = ctx.params.uid,
			_myuid = this.isAuthOp(ctx).id,
			_defaultPageSize = 10 //默认分页数

		const _selectSql = {},
			_skipCount = _defaultPageSize * (_pageNum - 1)

		_selectSql.uid = _uid ? _uid : _myuid

		const _userInfo = await User.findById(_selectSql.uid, 'gid nickname')

		const _list = await Daily
			.find(_selectSql, 'updateTime dailyList day')
			.skip(_skipCount)
			.limit(_defaultPageSize)
			.sort({
				day: -1
			})

		return ctx.success({
			data: {
				dailyList: _list,
				userinfo: _userInfo
			}
		})
	}

	// 获取某个人的日报一年内的日报统计
	static async dailyDashBoard(ctx) {
		// daily/dashboard/:id?
		const _uid = ctx.params.uid,
			_myuid = this.isAuthOp(ctx).id,
			_defaultPageSize = 357 + new Date().getDay()

		const _selectUid = _uid ? _uid : _myuid

		const _userInfo = await User
			.findById(_selectUid, 'gid nickname')
			.populate('gid', 'name')

		let _list = await Daily
			.aggregate([{
				$match: {
					uid: _selectUid
				},
			}, {
				$project: {
					_id: 0,
					day: '$day',
					count: {
						$size: "$dailyList"
					}
				}
			}])
			.limit(_defaultPageSize)
			.sort({
				day: 1
			})
		
		let _lastLen = _defaultPageSize - _list.length
		
		while(_lastLen > 0){
			let _array = {
				day: moment().subtract(_defaultPageSize - _lastLen, 'days').format('YYYY-MM-DD'),
				count: 0
			}

			_list.unshift(_array)
			_lastLen--
		}

		return ctx.success({
			data: {
				dayList: _list,
				userInfo: _userInfo
			}
		})
	}

	// 更新任务
	static async dailyUpdate(ctx) {
		const _id = ctx.params.id

		if (!_id) {
			return ctx.error({
				msg: '任务id不能为空'
			})
		}

		const _record = ctx.request.body.record,
			_progress = ctx.request.body.progress,
			_uid = this.isAuthOp(ctx).id

		if (!_record || _progress === undefined) {
			return ctx.success({
				msg: '数据未更新'
			})
		}

		const _update = await Daily
			.update({
				uid: _uid,
				day: moment().format('YYYY-MM-DD'),
				'dailyList._id': _id
			}, {
				$set: {
					'dailyList.$.progress': _progress,
					'dailyList.$.record': _record
				}
			})


		if (!_update) {
			return ctx.success({
				msg: '修改失败'
			})
		}

		return ctx.success({
			msg: '更新成功'
		})
	}

	// 删除任务
	static async dailyRemove(ctx) {
		const _id = ctx.params.id

		if (!_id) {
			return ctx.error({
				msg: '任务id不能为空'
			})
		}

		const _uid = this.isAuthOp(ctx).id

		const _detele = await Daily
			.update({
				uid: _uid,
				day: moment().format('YYYY-MM-DD'),
				'dailyList._id': _id
			}, {
				$pull: {
					dailyList: {
						'_id': _id
					}
				}
			})


		if (!_detele) {
			return ctx.success({
				msg: '删除失败'
			})
		}

		return ctx.success({
			msg: '删除成功'
		})
	}

}

DailyController.init()

module.exports =  DailyController