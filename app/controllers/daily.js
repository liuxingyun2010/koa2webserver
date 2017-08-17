import Group from '../models/group'
import User from '../models/user'
import Daily from '../models/daily'
import jwt from 'jsonwebtoken'
import {
	jwtKey
} from '../config'
import moment from 'moment'

class DailyController {
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
			_uid = DailyController.isAuthOp(ctx).id

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

		const _dailyInfo = {
			record: _record,
			progress: _progress,
			today: moment().format('YYYY-MM-DD'),
			uid: _uid
		}
		const _daily = await new Daily(_dailyInfo).save()

		if (_daily) {
			return ctx.success({
				_id: _daily._id,
				record: _daily.record,
				progress: _daily.progress
			})
		}

		return ctx.error({
			msg: '任务创建失败'
		})
	}

	// 查询分组列表
	static async find(ctx) {
		// let allDaily = await Daily.find({}, 'record progress')
		// let allDaily = await Daily.aggregate().group({ _id: '$progress' })
		let allDaily = await Daily.aggregate([{
			$group: {
				_id: {
					title: '$progress'
				},
			}
		}, {
			$sort: {
				_id: -1
			}
		}])



		if (allDaily) {
			return ctx.success({
				data: {
					daily: allDaily
				}
			})
		} else {
			return ctx.error({
				msg: '查询失败'
			})
		}
	}
}

export default DailyController