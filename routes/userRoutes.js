const express = require("express")
const userController = require("../controller/userController")
const userAuth = require("../middlewares/authMiddleware")

const router = express.Router()

//get users -- GET


// Update Users --- PUT
router.put("/update-user",userAuth, userController)

module.exports = router