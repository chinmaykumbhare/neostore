import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import NeostoreNavbar from './NeostoreNavbar';
import { Button, Table } from 'react-bootstrap';
import {verify_url, orders_url} from '../API/functionCalls';

export default function Orders(props) {

    const [userData, setUserData] = useState({});
    const [orders, setOrders] = useState({});

    const location = useLocation();

    useEffect(() => {
        async function verifyToken() {
            const token = localStorage.getItem("token");
            const data = await (await axios.post(verify_url, { token: token })).data;
            setUserData(data);
        }
        verifyToken();
    }, []);

    useEffect(() => {
        async function getOrders() {
            const data = await (await axios.post(orders_url, { userid: userData._id })).data;
            setOrders(data);
        }
        getOrders();
    }, [userData]);

    async function invoiceHandler(orderDetails) {
        console.log(orderDetails);
        const data = await (await axios.post("http://localhost:8090/pdf?order=" + JSON.stringify(orderDetails))).data;
        window.open("http://localhost:8090/invoice.pdf");

    }

    // console.log(orders);
    // console.log(userData);

    return (
        <div style={{minHeight: "100vh"}}>
            {(location.state === null) && <NeostoreNavbar />}
            <div className='container'>
                <h3>Orders:</h3>
                <hr />
                {orders.length > 0 && orders.map((item, index) => {
                    // console.log(item.order);
                    return (
                        <div key={index}>
                            <span>{index + 1}</span>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        item.order.map((ord) => {
                                            // console.log(ord.product.name);
                                            return (
                                                <tr key={Math.floor(Math.random() * 1000)}>
                                                    <td>{ord.product.name}</td>
                                                    <td> Qty: {ord.quantity}</td>
                                                    <td>{new Intl.NumberFormat('en-IN', {
                                                        style: "currency",
                                                        currency: "INR"
                                                    }).format(ord.product.price * ord.quantity)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <Button onClick={() => invoiceHandler(item.order)}>View Invoice</Button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
