const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// static signup method
userSchema.statics.signup = async function(userName, password) {


    // validation
    if (!userName || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ userName });

    if (exists) {
        throw Error("username already exists");
    }

    // salts password
    const salt = await bcrypt.genSalt(10);
    // hashes password
    const hash = await bcrypt.hash(password, salt);
    // stores in database
    const user = await this.create({ userName, password: hash });

    return user;
};

module.exports = mongoose.model("User", userSchema);
