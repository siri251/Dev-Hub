const mongoose = require("mongoose");

const user = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [user],
        required: false,
    }
}, {timestamps: true})

projectSchema.index({ 'members.userId': 1 })

module.exports = mongoose.model("Projects", projectSchema);
