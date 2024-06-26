const userModels = require("../model/userModels");

const registerController = async (req, res, next) => {
    // object destructuring
    const { name, email, password } = req.body;

    // validation
    if (!name) {
        return next('Name is required');
    }
    if (!email) {
        return next('Email is required');
    }
    if (!password) {
        return next('Password is required');
    }

    try {
        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email already registered, please login"
            });
        }

        const user = await userModels.create({ name, email, password });
        // token
        const token = user.createJWT();
        res.status(201).send({
            success: true,
            message: "User created successfully",
            user: {
                name: user.name,
                email: user.email,
                lastName: user.lastName,
                location: user.location
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return next('Please provide both email and password');
    }

    try {
        // find user by email
        const user = await userModels.findOne({ email });
        if (!user) {
            return next('Invalid Credentials');
        }

        // comparing password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next('Invalid Credentials');
        }

        const token = user.createJWT();
        res.status(200).json({
            success: true,
            message: 'Login Successfully',
            user,
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerController,
    loginController
};
