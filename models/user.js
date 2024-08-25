const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
},{ timestamps: true });

userSchema.pre('save', async function (next) {
    this.email = this.email.toLowerCase(); 
    return next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
