const {Schema, default: mongoose} = require('mongoose')

const JobSchema = new Schema({
    name: {
        type: String,
        required: [true,"the name of the job is required"],
        minLength: 1
    },
    description:{
        type:String,
        required: [true,'description of the job is required'],
        minLength: 1
    },
    userID:{
        type: String,
        required: [true,'userID of the job is required']
    }
})

module.exports = mongoose.model('job', JobSchema);