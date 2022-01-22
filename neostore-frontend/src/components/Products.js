import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cart, remove, setCart } from '../features/products/cartSlice';
import { category } from '../features/products/categoriesSlice';
import { data } from '../features/products/productsSlice';
import NeostoreNavbar from './NeostoreNavbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { products_url, categories_url } from '../API/functionCalls';

library.add(faShoppingCart);

export default function Products() {

    const [filterProducts, setFilterProducts] = useState([]);
    const [all, setAll] = useState(true);

    const globalProducts = useSelector(state => state.posts.products);
    const globalCategories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        async function getData() {
            const productData = await (await axios.get(products_url)).data;
            dispatch(data(productData));

            const cat_data = await (await axios.get(categories_url)).data;
            dispatch(category(cat_data));
        }

        async function getCartData() {
            const data = JSON.parse(localStorage.getItem("cart"));
            if (data !== undefined) {
                dispatch(setCart(data));
            } else {
                dispatch(setCart([]));
            }
        }

        getData();
        getCartData();
    }, []);

    useEffect(() => {
        if (filterProducts.length === 0) setAll(true);
    }, [filterProducts]);

    function handleCheckbox(event) {
        if (event.target.checked === true) {
            setFilterProducts([...filterProducts, event.target.name]);
            setAll(false);
        } else {
            setFilterProducts(filterProducts.filter(item => item !== event.target.name));
        }

    }

    function addToCart(product, index) {
        const add_id = "a" + index;
        const remove_id = "r" + index;
        dispatch(cart({ product: product, quantity: 1 }));
        document.getElementById(add_id).disabled = true;
        document.getElementById(remove_id).disabled = false;
        document.getElementById(remove_id).style.display = "inline";
    }

    function removeFromCart(product, index) {
        const add_id = "a" + index;
        const remove_id = "r" + index;
        dispatch(remove({ product: product, quantity: 1 }));
        document.getElementById(add_id).disabled = false;
        document.getElementById(remove_id).disabled = true;
    }

    return (

        <div>
            <NeostoreNavbar />
            <div className='container'>

                {/* Filter */}

                <div className='filter my-3 p-3' style={{ border: "1px solid white" }}>
                    <Row>
                        <h4 className="mx-1">Filter:</h4>
                        <Form>
                            {globalCategories.map((category, index) => {
                                return (
                                    <Form.Check key={index}
                                        inline
                                        label={category.category}
                                        name={category.category}
                                        type="checkbox"
                                        id="category-checkbox"
                                        onClick={event => handleCheckbox(event)}

                                    />
                                )
                            })}
                        </Form>
                    </Row>
                </div>

                {/* products */}

                <Row>
                    {(!all) ? (globalProducts.length > 0 && globalProducts.filter(item => filterProducts.includes(item.Category.category)).map((product, index) => {
                        return (
                            <Col key={index} xs={12} sm={12} md={6} lg={4}>
                                <Card bg="dark" variant="dark" className="my-3" >
                                    <Card.Header>{product.name}<Button style={{ float: "right" }} onClick={() => {
                                        navigate("/product?id=" + product._id);
                                    }} >{">"}</Button></Card.Header>
                                    <Card.Body>
                                        <Card.Img src={products_url + product.image}
                                            style={{ height: "250px", width: "320px", objectFit: "cover" }} ></Card.Img>
                                        <Card.Subtitle className="my-3" style={{ fontSize: "24px" }}>Price: {new Intl.NumberFormat('en-IN', {
                                            style: "currency",
                                            currency: "INR"
                                        }).format(product.price)}</Card.Subtitle>
                                        <Button variant="success" className="mx-3" id={"a" + index} onClick={() => addToCart(product, index)}>+</Button>
                                        <FontAwesomeIcon icon={"shopping-cart"} className='mx-1' />
                                        <Button variant="danger"
                                            style={{ display: "none" }} className="mx-3" id={"r" + index} onClick={() => removeFromCart(product, index)}>-</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })) : (globalProducts.length > 0 && globalProducts.map((product, index) => {
                        return (
                            <Col key={index} xs={12} sm={12} md={6} lg={4}>
                                <Card bg="dark" variant="dark" className="my-3" >
                                    <Card.Header>{product.name}<Button style={{ float: "right" }} onClick={() => {
                                        navigate("/product?id=" + product._id);
                                    }} >{">"}</Button></Card.Header>
                                    <Card.Body>
                                        <Card.Img src={products_url + product.image}
                                            style={{ height: "250px", width: "320px", objectFit: "cover" }} ></Card.Img>
                                        <Card.Subtitle className="my-3" style={{ fontSize: "24px" }}>Price: {new Intl.NumberFormat('en-IN', {
                                            style: "currency",
                                            currency: "INR"
                                        }).format(product.price)}</Card.Subtitle>
                                        <Button variant="success" className="mx-3" id={"a" + index} onClick={() => addToCart(product, index)}>+</Button>
                                        <FontAwesomeIcon icon={"shopping-cart"} className='mx-1' />
                                        <Button variant="danger"
                                            style={{ display: "none" }} className="mx-3" id={"r" + index} onClick={() => removeFromCart(product, index)}>-</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }))}
                </Row>
            </div>
        </div>
    )
}
