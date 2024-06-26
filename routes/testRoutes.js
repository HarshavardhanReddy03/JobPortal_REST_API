const express = require("express")
const { testPostController } = require("../controller/testController")
const userAuth = require("../middlewares/authMiddleware")

// router object

const router = express.Router()

//routes
router.post('/test-post',userAuth, testPostController)

//module export
module.exports = router