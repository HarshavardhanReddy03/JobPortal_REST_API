const userModels = require("../model/userModels");

const userController = async (req,res,next) =>{
    const {name,email,lastName,location} = req.body
    if(!name || !email || !lastName || !lastName){
        next("Provide all fields");
    }

    const user = await userModels.findOne({_id: req.user.userId})
    user.name = name
    user.lastName = lastName
    user.email = email
    user.location = location

    await user.save()
    const token = user.createJWT()
    res.status(200).json({
        user,
        token
    })
}

module.exports = userController