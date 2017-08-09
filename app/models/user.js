import mongoose from 'mongoose'

const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: Number,
        required: true
    }
})

export default mongoose.model('User', userSchema)