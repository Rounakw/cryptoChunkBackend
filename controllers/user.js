const User = require("../models/user")

async function handleRegisterUser(req, res) {
    const { email, userName, password } = req.body;

    try {
        if (!email || !userName || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: "Email already exists." });
        }

        const userNameExists = await User.findOne({ userName: userName });
        if (userNameExists) {
            return res.status(400).json({ success: false, message: "Username already exists." });
        }

        const newUser = await User.create({
            email: email,
            userName: userName,
            password: password
        });


        return res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: "Failed to register user." });
    }
}
async function handleLoginUser(req, res) {


}

module.exports = {
    handleRegisterUser,
    handleLoginUser
}