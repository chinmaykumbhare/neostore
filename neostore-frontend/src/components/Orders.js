import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import NeostoreNavbar from './NeostoreNavbar';
import { Button, Table } from 'react-bootstrap';
import { getOrdersAPI, invoiceHandler, verifyTokenDB } from '../API/APICalls';

export default function Orders(props) {

    const [userData, setUserData] = useState({});
    const [orders, setOrders] = useState({});

    const location = useLocation();

    useEffect(() => {
        async function verifyToken() {
            const data = await verifyTokenDB();
            setUserData(data);
        }
        verifyToken();
    }, []);

    useEffect(() => {
        async function getOrders() {
            const data = await getOrdersAPI(userData._id);
            setOrders(data);
        }
        getOrders();
    }, [userData]);

    return (
        <div style={{minHeight: "100vh"}}>
            {(location.state === null) && <NeostoreNavbar />}
            <div className='container'>
                <h3>Orders:</h3>
                <hr />
                {orders.length > 0 && orders.map((item, index) => {
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
