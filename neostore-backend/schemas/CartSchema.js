const mongoose = require("mongoose");

const cartModel = mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        unique: true,
        sparse: true,
        index: true
    },
    ip: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    Cart: {
        type: Array,
    }
});

module.exports = mongoose.model("Cart", cartModel);