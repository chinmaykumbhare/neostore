const mongoose = require("mongoose");

const productModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Products", productModel);