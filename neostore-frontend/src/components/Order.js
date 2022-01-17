import React, { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import NeostoreNavbar from './NeostoreNavbar';
import Total from './Total';
import { setCart } from '../features/products/cartSlice';
import sweet from "sweetalert2";
import {order_url, verify_url} from '../API/functionCalls';

export default function Order(props) {

    const [token, setToken] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {

        async function verifyToken() {
            const _token = localStorage.getItem("token");
            const data = await (await axios.post(verify_url, { token: _token })).data;
            setToken(data);
        }

        verifyToken();
    }, []);

    const globalCart = useSelector(state => state.cart.cart);
    const navigate = useNavigate();

    async function checkoutHandler() {
        const updateCart = [];
        const status = await (await axios.post(order_url, { userid: token._id, order: globalCart })).data;
        console.log(status);
        dispatch(setCart(updateCart));
        localStorage.removeItem("cart");
        sweet.fire({
            title: "Your order has been placed successfully! ",
            icon: "success",
            timer: 3000
        })
        navigate("/orders");
    }

    return (
        <div>
            <NeostoreNavbar />
            <div className='container my-3'>
                <h3>Order:</h3>

                {globalCart.map((item, index) => {

                    return (
                        <Row key={index} className='border my-2 mx-1'>
                            <Col sm={4}>{item.product.name}</Col>
                            <Col sm={4} className='px-2'>
                                Qty: {item.quantity}
                            </Col>
                            <Col sm={4} className='px-2 text-end'>{new Intl.NumberFormat('en-IN', {
                                style: "currency",
                                currency: "INR"
                            }).format(item.product.price * item.quantity)}</Col>
                        </Row>
                    )
                })}
                <hr />
                <Total />
                <hr />
                <h3>Address:</h3>
                <span>{token.address}</span>
                <br />
                <Button onClick={checkoutHandler}>Checkout</Button>
            </div>
        </div>
    )
}
