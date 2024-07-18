const User = require("../models/user")
module.exports = {

    signup: async (req, res) => {
        const { email, password } = req.body
        try {
            const isUsernameExist = await User.findOne({ email })

            if (isUsernameExist) {
                return res.status(200).json({ message: "Username with this keyword already exists. Try something new" })
            }
            const user = await User({ email, password })
            await user.save()
            res.status(200).json({ message: "User saved successfully" })

        } catch (error) {
            res.status(400).json({ message: "Error while saving user", error })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body
        try {
            const userExist = await User.findOne({ email })

            if (!userExist || !(await userExist.isValidPassword(password))) {
                console.log("userExist in controller ", userExist)
                res.status(401).json({ message: "Invalid credentials" })
            }
            req.session.userId = userExist._id; // Set session userId
            console.log("cookie:- " + req.session.userId);
            cookie = userExist._id
            res.status(200).json({ message: "Login successful" })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error })
        }
    },

    logout: async (req, res) => {
        req.session.destroy(function (error) {
            if (error) {
                return res.status(500).json({ message: "Failed to logout" })
            }
            res.clearCookie("connect.sid")
            res.json({ message: "Logout successfylly" })
        })
    },

    dashboard: async (req, res) => {
        if (!req.session.userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        try {
            const user = await User.findById(req.session.userId)
            res.send(`Welcome ${user.email}, This is your Dashboard`)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error })
        }
    }
}