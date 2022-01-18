import axios from "axios";

export async function getCartDB(token) {
    let data = [];
    data = await (await axios.get("http://localhost:8090/cart", { userid: token._id })).data;
    if (data.length === 0) {
        const ip = await (await axios.get("https://api.ipify.org/?format=json")).data;
        data = await (await axios.get("http://localhost:8090/cart", { userip: ip.ip })).data;
        return data;
    }
    return data;
}