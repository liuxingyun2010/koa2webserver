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
*	token
*	password
*	role
* 	createTime
* 	updateTIme
*/

const userSchema = new Schema({
    mobile: {
    	unique: true,
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
    	unique: true,
    	type: String
    },
    gid: {
    	type: Number,
    	default: 0,
    	required: true
    },
    uid: {
    	type: Number,
    	required: true
    },
    // token: {
    // 	type: String,
    // 	required: true
    // },
    password: {
    	type: String,
    	required: true
    },
    role: {
    	type: Number,
    	required:true
    },
    createTime: {
    	type: String,
    	required: true,
    	default: Date.now()
    },
    updateTIme: {
    	type: String,
    	default: Date.now()
    }
})

export default mongoose.model('User', userSchema)