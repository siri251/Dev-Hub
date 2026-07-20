const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./src/config/db");
const authRouter = require('./src/routes/auth')
const projectRouter = require("./src/routes/projects");
const taskRouter = require("./src/routes/tasks");
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cors())
app.use(cookieParser());  
app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)
app.use("/api/tasks", taskRouter)
 

app.get('/', (req, res) => {
    res.json({ message: 'API is running' })
})

module.exports = app