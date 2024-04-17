const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    gmail:{
        type: String,
        required: [true,"the email is required"],
        minLength: 10,
        validate:{
             validator: isEmail,
             message: "this is not a valid email"
        }
    },
    password: {
        type: String,
        required:[true,"the password is required"],
        minLength: 8
    },
    refreshToken:{
        type: String,
    }
})

module.exports = mongoose.model('user',userSchema)