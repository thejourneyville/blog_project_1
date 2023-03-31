const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// signup user
const signupUser = async (req, res) => {

    const { userName, password } = req.body;

    try {
        const user = await User.signup(userName, password)
        res.status(200).json({userName, user})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }