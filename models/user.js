const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10); // Corrected method to generate salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log("error ", error); // Pass error to next middleware
    }
})

userSchema.methods.isValidPassword = async function(password) {
    console.log("new password: ", password);
    console.log("stored password: ", this.password);
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema)

module.exports = User;