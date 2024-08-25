const express = require('express')
const { handleRegisterUser, handleLoginUser } = require('../controllers/user')
const router = express.Router()

router.post("/ ",handleRegisterUser)
router.post("/login",handleLoginUser)

module.exports = router