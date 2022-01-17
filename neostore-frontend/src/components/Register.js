import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faUser, faEnvelope, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import {adduser_url} from '../API/functionCalls';

library.add(faLock, faUser, faEnvelope, faLocationArrow);

export default function Register() {

    const [username, setUsername] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [seller, setSeller] = useState(false);
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    async function registerHandler() {
        const obj = { username: username, email: useremail, password: password, seller: seller, address: address };
        console.log(obj);
        const data = await (await axios.post(adduser_url, obj)).data;
        console.log(data);
        if (data === "error") {
            document.getElementById("error").textContent = "Uh-Oh! Please Check your username and/or password and try again!";
        } else {
            navigate("/login");
        }

    }

    return (
        <div className='App mt-3'>
            <h3>Register</h3>
            <Form>
                <Form.Group as={Row} className="text-end">
                    <Form.Label column sm={4}>username <FontAwesomeIcon icon={"user"} /></Form.Label>
                    <Col sm={8}>
                        <Form.Control placeholder='johndoe' type='text' onChange={event => setUsername(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="text-end">
                    <Form.Label column sm={4}>email <FontAwesomeIcon icon={"envelope"} /></Form.Label>
                    <Col sm={8}>
                        <Form.Control placeholder='johndoe@gmail.com' type='email' onChange={event => setUserEmail(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="text-end">
                    <Form.Label column sm={4}>password <FontAwesomeIcon icon={"lock"} /></Form.Label>
                    <Col sm={8}>
                        <Form.Control type='password' onChange={event => setPassword(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="text-end">
                    <Form.Label column sm={4}>confirm password <FontAwesomeIcon icon={"lock"} /></Form.Label>
                    <Col sm={8}>
                        <Form.Control type='password' onChange={event => setCPassword(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="text-end">
                    <Form.Label column sm={4}>address <FontAwesomeIcon icon={"location-arrow"} /></Form.Label>
                    <Col sm={8}>
                        <Form.Control type='text' onChange={event => setAddress(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        inline
                        label="seller"
                        name="seller"
                        type="checkbox"
                        id="category-checkbox"
                        onClick={event => {
                            (event.target.checked) ? setSeller(true) : setSeller(false);
                        }}

                    />
                </Form.Group>
                <Form.Group>
                    <h3 id="error" style={{ color: "#f76156" }}></h3>
                </Form.Group>
                <Form.Group>
                    {(password !== "" && (password === cpassword)) && <Button onClick={registerHandler}>Register</Button>}
                    <Link to="/login" className='mx-3'>Already a user?</Link>
                </Form.Group>
            </Form>
        </div>
    )
}
