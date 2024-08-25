const express = require('express')
const { handleCheckOtp, handleCreateOtp } = require('../controllers/otp')
const router = express.Router()

router.post("/create",handleCreateOtp)
router.post("/check",handleCheckOtp)

module.exports = router