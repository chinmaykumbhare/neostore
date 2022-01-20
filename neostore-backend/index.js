const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const upload = require('multer')();
const productModel = require("./schemas/ProductSchema");
const categoryModel = require("./schemas/CategorySchema");
const UserSchema = require("./schemas/UserSchema");
const CartSchema = require("./schemas/CartSchema");
const categoryRouter = require("./routers/categoryRouter");
const pdfRouter = require("./routers/pdfRouter");

require('dotenv').config();

server.use(cors());
server.use(express.static("images"));
server.use(express.static("users"));
server.use(express.static("invoice"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const toID = mongoose.Types.ObjectId;

mongoose.connect("mongodb://localhost:27017/neostore", (err) => {
    if (err) throw new Error(err);
    console.log("Connected to MONGO");
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * USERS: Add, List -> dev, verify -> dev + prod
 */

server.post("/user", async (request, response) => {
    const data = await UserSchema.find({ username: request.body.username });
    response.send(data);
})

server.post("/otp", async (request, response) => {
    const otp = Math.floor(Math.random() * 10000);
    const sender = await UserSchema.find({ username: request.body.username });
    const senderEmail = sender[0].email;
    if (senderEmail !== undefined) {
        let mailBody = {
            from: "NeoSTORE Devs",
            to: senderEmail,
            subject: "NeoStore OTP",
            text: "OTP is " + otp + "\n-Team NeoSTORE"
        }
        transporter.sendMail(mailBody, (err, data) => {
            if (err) throw new Error(error);
            console.log("Email sent to " + senderEmail);
        });
    }
    response.send(otp.toString());
})

server.post("/resetpassword", async (request, response) => {
    bcrypt.hash(request.body.password, 10, async (err, hash) => {
        const status = await UserSchema.updateOne({
            username: request.body.username
        }, { password: hash });
        response.send(status);
    })
})

server.post("/adduser", async (request, response) => {
    bcrypt.hash(request.body.password, 10, async (err, hash) => {
        const status = await UserSchema.insertMany({
            username: request.body.username,
            password: hash, seller: request.body.seller,
            email: request.body.email,
            address: request.body.address
        });
        response.send(status);
    })
})

server.post("/login", async (request, response) => {
    const userData = await UserSchema.find({ username: request.body.username });
    if (userData.length > 0) {
        bcrypt.compare(request.body.password, userData[0].password, async (err, result) => {
            if (err) throw new Error(err);
            if (result) {
                const token = await jwt.sign({
                    _id: userData[0]._id,
                    username: userData[0].username,
                    seller: userData[0].seller,
                    address: userData[0].address
                }, process.env.PASSWORD_HASHED_KEY, { expiresIn: '3d' });
                response.send(token);

            }
            if (!result) {
                response.send("error");
            }
        });
    } else {
        response.send("error");
    }

})

server.post("/socialuser", async (request, response) => {
    const userData = await UserSchema.find({ email: request.body.email });
    if (userData.length > 0) {
        const token = await jwt.sign({
            _id: userData[0]._id,
            username: userData[0].username,
            seller: userData[0].seller,
            address: userData[0].address
        }, process.env.PASSWORD_HASHED_KEY, { expiresIn: '3d' });
        response.send(token);
    } else {
        const status = await UserSchema.insertMany({
            username: request.body.email,
            email: request.body.email
        });
        response.send(status);
    }
})

server.post("/verify", async (request, response) => {
    const token = request.body.token;
    const decodedData = jwt.verify(token, process.env.PASSWORD_HASHED_KEY);
    response.send(decodedData);
})

server.post("/updatepic", upload.single("file"), async (request, response) => {

    const {
        file,
        body: { }
    } = request;

    const fileName = request.body.id + ".jpg";

    if (fileName !== undefined) {
        fs.writeFile(__dirname + "/images/users/" + fileName, file.buffer, (err) => {
            if (err) {
                throw new Error(err);
                response.send(err);
            }
            response.send("file upload successful");
        })
    } else {
        response.send("file upload not successful");
    }

});

server.post("/getaddress", async (request, response) => {
    const data = await UserSchema.find({username: request.body.username});
    response.send(data[0].address);
})

server.post("/addaddress", async (request, response) => {
    const status = await UserSchema.updateOne({_id: request.body.id}, {address: request.body.address});
    response.send(status);
})

/**
 * Add category, products => barebone url
 */

server.post("/addcategory", async (request, response) => {
    categoryModel.insertMany(request.body);
    response.send("hit");
})

server.post("/upload", upload.single("file"), async (request, response) => {

    const {
        file,
        body: { }
    } = request;

    fs.writeFile(__dirname + "/images/products/" + file.originalname, file.buffer, (err) => {
        if (err) {
            throw new Error(err);
            response.send(err);
        } else {
            if (request.body.catid !== undefined) {
                const catid = toID(request.body.catid);
                productModel.insertMany({ name: request.body.name, Category: catid, image: file.originalname, price: request.body.price });
                response.send("File Upload Successful");
            } else {
                response.send("Uh-Oh! Please check the corresponding category ID");
            }
        };
    })
});

/**
 * Get Products => populate category, return
 */

server.get("/products", async (request, response) => {
    const products = await productModel.find({}).populate({ path: "Category", model: "Category" });
    response.send(products);
})

server.post("/product", async (request, response) => {
    const id = request.body.id;
    if (id !== undefined) {
        const product = await productModel.find({ _id: id }).populate({ path: "Category", model: "Category" });
        response.send(product);
    } else {
        response.send("Error!");
    }
});

server.get("/categories", async (request, response) => {
    const categories = await categoryModel.find({});
    response.send(categories);
})

/**
 * Cart -> getCartItems, add to cart, remove from cart
 */

server.get("/cart", async (request, response) => {
    let cart = [];
    if (request.body.userip === undefined) {
        cart = await CartSchema.findOne({ ip: request.body.userip });
    } else {
        cart = await CartSchema.findOne({ User: request.body.userid });
    }
    response.send(cart);
})

server.post("/cart", async (request, response) => {

    if (request.body.userip) {
        const isPresent = await CartSchema.find({ ip: request.body.userip });
        let status = [];
        if (isPresent.length) {
            status = await CartSchema.updateOne({
                ip: request.body.userip
            }, { Cart: request.body.Cart });
        } else {
            status = await CartSchema.insertMany({
                ip: request.body.userip,
                Cart: request.body.Cart
            });
        }
        response.send(status);
    } else {
        const isPresent = await CartSchema.find({ User: request.body.userid });
        let status = [];
        if (isPresent.length) {
            status = await CartSchema.updateOne({
                User: request.body.userid
            }, { Cart: request.body.Cart });
        } else {
            status = await CartSchema.insertMany({
                User: request.body.userid,
                Cart: request.body.Cart
            });
        }
        response.send(status);
    }
})

/**
 * orders: place, history
 */

server.post("/order", async (request, response) => {
    const status = await UserSchema.updateOne({ _id: request.body.userid }, {
        $push: { orders: { order: request.body.order } }
    });
    response.send(status);
});

server.post("/orders", async (request, response) => {
    if (request.body.userid !== undefined) {
        const orderData = await UserSchema.find({ _id: request.body.userid });
        response.send(orderData[0].orders);
    } else {
        response.send([]);
    }
})

/**
 * Filter
 */

server.use("/filter", categoryRouter);

/**
 * PDF
 */

server.use("/pdf", pdfRouter);

server.listen(8090, () => {
    console.log("Listening on port 8090");
})