const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
//schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate: validator.isEmail,
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,'Paswoord length must be greater than 6 characters'],
    },
    location:{
        type:String,
        default: 'India'
    }
},{timestamps: true});

// middleware -- encrypt password
userSchema.pre('save', async function(){
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

//compare password
userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

// webtoken
userSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id},process.env.JWT_SECRET, {expiresIn:'1d'});
}
module.exports = mongoose.model('User', userSchema)