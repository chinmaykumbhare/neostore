const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
        required: true
    },
    password: {
        type: String,
    },
    seller: {
        type: Boolean,
        default: false
    },
    address: {
        type: Array,
        default: []
    },
    orders: {
        type: Array
    },
    email : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("users", userSchema);