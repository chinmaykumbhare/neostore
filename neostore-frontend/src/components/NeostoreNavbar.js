import React, { useEffect, useState } from 'react'
import { Image, Navbar, Modal, Button, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faUserCircle, faSignOutAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { cart, remove, setCart, setQuantity } from '../features/products/cartSlice';
import {verify_url} from '../API/functionCalls';

library.add(faShoppingCart, faUserCircle, faSignOutAlt, faWindowClose);

export default function NeostoreNavbar() {

    const [show, setShow] = useState(false);
    const [token, setToken] = useState({});
    const [total, setTotal] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const globalCart = useSelector(state => state.cart.cart);

    useEffect(() => {

        async function verifyToken() {
            const _token = localStorage.getItem("token");
            const data = await (await axios.post(verify_url, { token: _token })).data;
            // const ip = await (await axios.get("https://api.ipify.org/?format=json")).data;
            // console.log(ip);
            setToken(data);
        }

        verifyToken();
    }, []);

    function handleOrder() {
        navigate("/order");
    }

    function updateQuantity(item, quantity) {
        let cart_copy = [];
        for (let loop = 0; loop < globalCart.length; loop++) {
            if (globalCart[loop].product.name === item.product.name) {
                cart_copy[loop] = { product: item.product, quantity: quantity };
            } else {
                cart_copy[loop] = globalCart[loop];
            }
        }
        dispatch(setCart(cart_copy));
    }

    /**
     * @param {onbeforeunload} event 
     * legacy trigger -> save cart
     */

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        if (e) {
            localStorage.setItem("cart", JSON.stringify(globalCart));
            // e.returnValue = ''; // Legacy method for cross browser support
        } else {
            localStorage.setItem("cart", JSON.stringify(globalCart));
            // e.preventDefault();
        }
        // return ''; // Legacy method for cross browser support
    };

    return (
        <div>
            <Navbar bg="primary" variant="primary" className="mb-3 px-3">
                <Navbar.Brand href="/products"> <Image src='brand-nav.png' height={"50px"} alt="brand" /> </Navbar.Brand>
                <Navbar.Collapse className='justify-content-end' style={{ marginInline: "4rem" }}>
                    <FontAwesomeIcon icon={"shopping-cart"} className='cart-icon'
                        onClick={() => {
                            localStorage.setItem("cart", JSON.stringify(globalCart));
                            handleShow()
                        }} />{ globalCart === null ? 0 : globalCart.length}
                    <Dropdown>
                        <Dropdown.Toggle>
                            <FontAwesomeIcon icon={"user-circle"} className="ms-1 me-1" />
                            {token.username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                                navigate("/myaccount");
                            }}>Account</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                navigate("/orders");
                            }}>Previous Orders</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <FontAwesomeIcon icon={"sign-out-alt"} className='ms-1' className="logout-icon" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }} />
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose} className='cart-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(globalCart.length > 0) ? globalCart.map((item, index) => {

                        return (
                            <div key={index}>
                                <span className="mx-3">
                                    <FontAwesomeIcon icon="window-close" className='mx-1'
                                        onClick={() => {
                                            const add_id = "a" + index;
                                            const remove_id = "r" + index;
                                            setTotal(total - (item.product.price * item.quantity));
                                            dispatch(remove(item));
                                            document.getElementById(add_id).disabled = false;
                                            document.getElementById(remove_id).disabled = true;
                                        }} />
                                </span>
                                <span>{item.product.name}</span><span id={index} style={{ float: "right" }}>{new Intl.NumberFormat('en-IN', {
                                    style: "currency",
                                    currency: "INR"
                                }).format(item.product.price * item.quantity)}</span>        

                                <Dropdown className="mx-3">
                                    <Dropdown.Toggle>
                                        <span id="quantity">{item.quantity}</span>
                                        <Dropdown.Menu>
                                            {quantityArr.map((quantity) => {
                                                return (
                                                    <Dropdown.Item key={parseInt(Math.random() * 1000)}
                                                        onClick={() => {
                                                            // setTotal(total + item.price * quantity);
                                                            document.getElementById(index).textContent = new Intl.NumberFormat('en-IN', {
                                                                style: "currency",
                                                                currency: "INR"
                                                            }).format(item.product.price * quantity);
                                                            document.getElementById("quantity").textContent = quantity;
                                                            updateQuantity(item, quantity);
                                                        }}>{quantity}</Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown.Toggle>
                                </Dropdown>
                                <hr />
                            </div>
                        )
                    }) : (<>No items in your cart</>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleOrder}>
                        {">"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
