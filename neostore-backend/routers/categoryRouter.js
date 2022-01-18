const router = require("express").Router();
const ProductSchema = require("../schemas/ProductSchema");

router.get("/all", async (request, response) => {
    const data = await ProductSchema.find({}).populate({ path: "Category", model: "Category" });
    response.send(data);
})

router.get("/", async (request, response) => {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let data = [];

    if (page === 1) {
        data = await ProductSchema.find().limit(limit).populate({ path: "Category", model: "Category" }).exec();
    } else {
        data = await ProductSchema.find().limit(limit).skip(startIndex).populate({ path: "Category", model: "Category" }).exec();
    }
    const filter = data.filter(item => request.query.category.includes(item.Category.category));
    response.send(filter);
})

module.exports = router;