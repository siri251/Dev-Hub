const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    }
}, {timestamps: true})

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);

// const createUser = async () => {
//     await User.create({ name: 'siri', email: 'test@gmail.com', password: '123' })
//     console.log('User created!')
// }
  
// createUser()