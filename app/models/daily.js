import mongoose from 'mongoose'

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
    record: {
        type: String,
        required: true,
        default: ''
    },
    progress: {
        type: Number,
        default: 0,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    today: {
        type: String,
        default: ''
    },
    createTime: {
    	type: Date,
    	default: Date.now()
    },
    updateTime: {
    	type: Date,
    	default: Date.now()
    }
})

DailySchema.pre('save', function(next){
    if(this.isNew){
        this.createTime = this.updateTime = Date.now()
    }else{
        this.updateTime = Date.now()
    }

    next()
})

export default mongoose.model('Daily', DailySchema)


