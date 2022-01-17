import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NeostoreNavbar from './NeostoreNavbar';
import {product_url, products_url} from '../API/functionCalls';

export default function Product() {

    const location = useLocation();
    const queryString = location.search;

    const [id, setID] = useState(0);
    const [product, setProduct] = useState([]);

    // console.log(queryString);

    useEffect(() => {
        const tempId = queryString.split("?")[1].split("=")[1];
        console.log(tempId);
        setID(tempId);

        async function getProductData() {
            const data = await (await axios.post(product_url, { id: tempId })).data;
            setProduct(data[0]);
        }

        getProductData();

    }, []);

    console.log(product);

    return (
        <div>
            <NeostoreNavbar />
            <div className='App container'>
                <Row>
                    <Col sm={7} className="border p-3">
                        <img src={products_url + product.image}
                            alt={product.name} style={{height: "480px", width: "100%"}} ></img>
                    </Col>
                    <Col sm={5} className="text-end">
                        {product.name}
                        <hr />
                        <div>
                            Price: {new Intl.NumberFormat('en-IN', {
                                style: "currency",
                                currency: "INR"
                            }).format(product.price)}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
