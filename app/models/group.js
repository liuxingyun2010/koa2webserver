var mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.Promise = global.Promise

/**
*	定义分组表字段
* 	gid 
* 	name
* 	createTime
* 	updateTIme
*/

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('Group', GroupSchema)


