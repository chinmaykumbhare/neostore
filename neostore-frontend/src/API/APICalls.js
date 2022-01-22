import axios from "axios";
import { addaddress_url, address_url, adduser_url, categories_url, generate_invoice_url, invoice_url, login_url, orders_url, order_url, otp_url, products_url, product_url, reset_url, socialuser_url, updatepic_url, verify_url } from "./functionCalls";

export async function verifyTokenDB() {
    const _token = localStorage.getItem("token");
    const data = await(await axios.post(verify_url, { token: _token })).data;
    return data;
}

export async function getAddressDB(username) {
    const data = await (await axios.post(address_url, { username: username })).data;
    return data;
}

export async function updateAddressDB(token, address_array) {
    const data = await (await axios.post(addaddress_url, {id: token._id, address: address_array})).data;
}

export async function resetPasswordAPI(username, password) {
    const data = await (await axios.post(reset_url, {username: username, password: password})).data;
    return data;
}

export async function otpAPI(username) {
    const data = await (await axios.post(otp_url, {username: username})).data;
    return data;
}

export async function loginAPI(username, password) {
    const data = await (await axios.post(login_url, { username: username, password: password })).data;
    return data;
}

export async function socialUserAPI(user) {
    const data = await (await axios.post(socialuser_url, user)).data;
    return data;
}

export async function checkoutAPI(userid, order) {
    const data = await (await axios.post(order_url, { userid: userid, order: order })).data
    return data;
}

export async function getOrdersAPI(userid) {
    const data = await (await axios.post(orders_url, { userid: userid })).data;
    return data;
}

export async function invoiceHandler(orderDetails) {
    const data = await (await axios.post(generate_invoice_url + JSON.stringify(orderDetails))).data;
    window.open(invoice_url);
}

export async function getProductDataAPI(tempId) {
    const data = await (await axios.post(product_url, { id: tempId })).data;
    return data;
}

export async function getProductsDataAPI() {
    const productData = await (await axios.get(products_url)).data;
    return productData;
}

export async function getCategoriesDataAPI() {
    const categoryData = await (await axios.get(categories_url)).data;
    return categoryData;
}

export async function addUserAPI(obj) {
    const data = await (await axios.post(adduser_url, obj)).data;
    return data;
}

export async function updatePicAPI(data) {
    const status = await axios.post(updatepic_url, data);
    return status;
}