module.exports = {
    isAuthenticated: async (req, res ,next) => {
        if(!req.session.userId) {
            return res.status(401).json({ message: "Unauthorized"})
        }
        next()
    }
}