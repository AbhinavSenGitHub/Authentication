const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.pre('save', async (next)=>{
    console.log("user save ")
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Corrected method to generate salt
        this.password = await bcrypt.hash(this.password, salt);
        
        next();
    } catch (error) {
        console.log("error ", error); // Pass error to next middleware
    }
})

userSchema.method.isValidPassword = async (password) => {
    return  await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User;