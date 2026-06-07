const mongoose = require("mongoose");

const orgMembershipSchema = new mongoose.Schema({
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Collaborator"]
    }
}, {timestamps: true})

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("OrgMembership", orgMembershipSchema);

// const createUser = async () => {
//     await User.create({ name: 'siri', email: 'test@gmail.com', password: '123' })
//     console.log('User created!')
// }
  
// createUser()