const nodemailer = require('nodemailer');

const sendOtpEmail = async (otp, email) => {
    try {
       
        const transporter = nodemailer.createTransport({
            secure:true,
            host:'smtp.gmail.com',
            port:465,
            auth: {
                user: process.env.SENDER_EMAIL, 
                pass: process.env.SENDER_EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL, 
            to: email, 
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 3 minutes.`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Failed to send OTP email.');
    }
};

module.exports = sendOtpEmail;
