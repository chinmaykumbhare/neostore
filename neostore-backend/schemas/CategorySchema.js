const mongoose = require("mongoose");

const categoryModel = mongoose.Schema({
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Category", categoryModel);