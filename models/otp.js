const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 180 
    }
}, { timestamps: true });

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;
