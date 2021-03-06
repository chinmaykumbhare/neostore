import React, { useState, useEffect } from 'react'
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import NeostoreNavbar from './NeostoreNavbar';
import Total from './Total';
import { setCart } from '../features/products/cartSlice';
import sweet from "sweetalert2";
import { checkoutAPI, getAddressDB, verifyTokenDB } from '../API/APICalls';

export default function Order(props) {

    const [token, setToken] = useState({});
    const [address, setAddress] = useState([]);
    const [deliverHere, setDeliverHere] = useState("");

    const dispatch = useDispatch();

    async function getAddress(username) {
        const data = await getAddressDB(username);
        setAddress(data);
    }

    useEffect(() => {

        async function verifyToken() {
            const data = await verifyTokenDB();
            setToken(data);
            getAddress(data.username);
        }

        verifyToken();
    }, []);

    const globalCart = useSelector(state => state.cart.cart);
    const navigate = useNavigate();

    async function checkoutHandler() {
        const updateCart = [];
        const status = checkoutAPI(token._id, globalCart);
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
                <Row>
                    <Col>
                        <h3>Address:</h3>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant='dark' >Address</Dropdown.Toggle>
                            <Dropdown.Menu variant='dark' >
                                {address.map((address, index) => {
                                    return (
                                        <Dropdown.Item key={index} onClick={() => {
                                            setDeliverHere(address);
                                        }}>{address}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <h4>{deliverHere}</h4>

                <Button onClick={checkoutHandler}>Checkout</Button>
            </div>
        </div>
    )
}
