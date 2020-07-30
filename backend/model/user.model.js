const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true

    }, email: {
        type: String,
        unique: true

    },
    address: {
        permanent_address: String,
        temp_address: String
    },
    phoneNumber: Number,
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    DOB: Date,
    image: String,
    role: Number,

}, {
    timestamps: true
})
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel; 