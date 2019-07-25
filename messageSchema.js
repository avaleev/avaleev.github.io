const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true, "Username is required"]
    },
    message: {
        type: String,
        required: [true, "Message cannot be empty"]
    }
});

module.exports = messageSchema;