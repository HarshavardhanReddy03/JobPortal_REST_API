const express = require("express")
const {registerController, loginController} = require("../controller/authController")

const router = express.Router()

//register post
router.post('/register', registerController)

//login post
router.post('/login', loginController)

module.exports = router