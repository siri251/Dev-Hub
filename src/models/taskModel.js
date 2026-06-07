const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {timestamps: true})

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("Tasks", taskSchema);

// const createUser = async () => {
//     await User.create({ name: 'siri', email: 'test@gmail.com', password: '123' })
//     console.log('User created!')
// }
  
// createUser()