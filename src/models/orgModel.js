const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {timestamps: true})

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("Organization", orgSchema);

// const createUser = async () => {
//     await User.create({ name: 'siri', email: 'test@gmail.com', password: '123' })
//     console.log('User created!')
// }
  
// createUser()