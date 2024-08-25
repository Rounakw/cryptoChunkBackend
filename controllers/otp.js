const Otp = require("../models/otp");
const sendOtpEmail = require("../services/mail");

async function handleCreateOtp(req, res) {
    const { email } = req.body;

    const otpValue = Math.floor(10000 + Math.random() * 90000).toString();

    try {
        let otpDocument = await Otp.findOne({ email: email });

        if (otpDocument) {
            otpDocument.otp = otpValue;
            await otpDocument.save();
        } else {
            otpDocument = await Otp.create({
                email: email,
                otp: otpValue
            });
        }

        await sendOtpEmail(otpValue, email);
        return res.status(200).json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
        console.error('Error handling OTP creation:', error);
        return res.status(500).json({ success: false, message: "Failed to create OTP." });
    }
}

async function handleCheckOtp(req, res) {
    const { email, otp } = req.body;

    try {
        const otpDocument = await Otp.findOne({ email: email });

        if (!otpDocument) {
            return res.status(400).json({ success: false, message: "OTP not found for this email." });
        }

        if (otpDocument.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }

        return res.status(200).json({ success: true, message: "OTP is valid." });
    } catch (error) {
        console.error('Error checking OTP:', error);
        return res.status(500).json({ success: false, message: "Failed to check OTP." });
    }
}

module.exports = {
    handleCreateOtp,
    handleCheckOtp
};
