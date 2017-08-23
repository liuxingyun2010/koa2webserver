var mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.Promise = global.Promise

/**
*	定义用户表字段
* 	record  任务内容
* 	progress 进度
*	uid 用户id
* 	today 日期
* 	createTime 
* 	updateTIme
*/

const DailySchema = new Schema({
    uid: {
        type: String,
        required: true,
        ref: 'User' 
    },
    gid: {
        type: String,
        required: true,
        ref: 'Group'
    },
    day: {
        type: String,
        default: ''
    },
    dailyList: [{
        record: {
            type: String,
            required: true,
            default: ''
        },
        progress: {
            type: Number,
            default: 0,
            required: true
        }
    }],
    createTime: {
    	type: Date,
    	default: Date.now
    },
    updateTime: {
    	type: Date,
    	default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('Daily', DailySchema)


