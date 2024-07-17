const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const connectDB = require('./config/db')
const authRouters = require("./routes/auth")

const app = express()
const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB();

// use
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true}
}))
app.use("/auth", authRouters)


// app.get("/", (req, res) => {
//     res.send('<h1>Home</h1><form action="/auth/signup" method="POST">Email: <input type="email" name="email"><br>Password: <input type="password" name="password"><br><button type="submit">Login</button></form>');
// })

app.listen(PORT, () => {
    console.log("listening on port", PORT)
})