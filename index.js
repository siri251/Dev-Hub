require('dotenv').config();
const app = require('./app');
const connectDb = require('./src/config/db');
const port = process.env.PORT || 8000



const start = async () => {
    await connectDb()  // ← connect first
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
  
start()