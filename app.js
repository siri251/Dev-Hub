const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./src/config/db");
const authRouter = require('./src/routes/auth')
const projectRouter = require("./src/routes/projects");
const taskRouter = require("./src/routes/tasks");
const cookieParser = require("cookie-parser");

app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(cookieParser());  
app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)
app.use("/api/tasks", taskRouter)
 

app.get('/', (req, res) => {
    res.json({ message: 'API is running' })
})

module.exports = app