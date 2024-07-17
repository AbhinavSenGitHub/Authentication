const express = require("express")
const authController = require("../controllers/authController")
const { isAuthenticated } = require("../middlewares/authMiddlewares")
const loginLimiter = require("../middlewares/rateLimiter")

const router = express.Router()

router.post("/signup", authController.signup)
router.post("/login", loginLimiter, authController.login)
router.get("/logout", authController.logout)
router.get("/dashboard", isAuthenticated, authController.dashboard)

module.exports = router