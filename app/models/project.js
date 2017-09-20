var mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.Promise = global.Promise

/**
*	定义项目表字段
* 	name  项目名称
* 	status 状态 1:进行中   2：已归档， 3：已删除
* 	createTime 
* 	updateTIme
*/

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        require: true,
        default: 1
    },
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

module.exports = mongoose.model('Project', ProjectSchema)


