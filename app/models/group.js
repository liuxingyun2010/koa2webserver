import mongoose from 'mongoose'

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
    	default: Date.now()
    },
    updateTime: {
    	type: Date,
    	default: Date.now()
    }
})

GroupSchema.pre('save', function(next){
    if(this.isNew){
        this.createTime = this.updateTime = Date.now()
    }else{
        this.updateTime = Date.now()
    }

    next()
})

export default mongoose.model('Group', GroupSchema)


