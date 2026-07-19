const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Projects", projectSchema);
