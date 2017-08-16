import mongoose from 'mongoose'

const Schema = mongoose.Schema

mongoose.Promise = global.Promise

/**
*	定义用户表字段
* 	nickname 
* 	email
*	mobile
*	gid
* 	uid
*   token
*	password
*	role
* 	createTime
* 	updateTIme
*/

const UserSchema = new Schema({
    mobile: {
        type: String,
        default: ''
    },
    nickname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
    	type: String,
        default: ''
    },
    gid: {
    	type: String,
    	default: ''
    },
    password: {
    	type: String,
    	required: true
    },
    role: {
    	type: Number,
        default: 2 //1：管理员， 2：普通用户
    },
    createTime: {
    	type: String,
    	default: Date.now()
    },
    updateTime: {
    	type: String,
    	default: Date.now()
    }
})

UserSchema.pre('save', function(next){
    if(this.isNew){
        this.createTime = this.updateTime = Date.now()
    }else{
        this.updateTime = Date.now()
    }

    next()
})
export default mongoose.model('User', UserSchema)


