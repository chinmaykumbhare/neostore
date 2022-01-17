import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {login_url} from '../API/functionCalls';

library.add(faLock, faUser);

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function loginHandler() {
        const data = await (await axios.post(login_url, { username: username, password: password })).data;
        if (!data) {
            document.getElementById("error").textContent = "Uh-Oh! Please Check your username and/or password and try again!";
        }
        if (data === "error") {
            document.getElementById("error").textContent = "Uh-Oh! Please Check your username and/or password and try again!";
        } else {
            localStorage.setItem("token", data);
            setTimeout(() => {
                navigate("/products");
            }, 200);
        }
    }

    return (
        <div className="App mt-3" >
            <h3>Login  </h3>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>username <FontAwesomeIcon icon={"user"} /></Form.Label>
                    <Col sm={9}>
                        <Form.Control placeholder='johndoe@gmail.com' type='text' onChange={event => setUsername(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>password <FontAwesomeIcon icon={"lock"} /></Form.Label>
                    <Col sm={9}>
                        <Form.Control type='password' onChange={event => setPassword(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <h3 id="error" style={{ color: "#f76156" }}></h3>
                </Form.Group>
                <Form.Group>
                    <Button onClick={loginHandler}>Login</Button>
                    <Link to="/forgotpassword" className='mx-3'>Forgot Password?</Link>
                </Form.Group>
            </Form>
        </div>
    )
}
