import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { login_url } from '../API/functionCalls';
import { GoogleLogin } from 'react-google-login';

library.add(faLock, faUser);

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [profile, setProfile] = useState([]);

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

    async function postSocialData(profile) {
        console.log(profile);
        const user = {username: profile.email, email: profile.email};
        const data = await (await axios.post("http://localhost:8090/socialuser", user)).data;
        console.log(data);
        localStorage.setItem("token", data);
        setTimeout(() => {
            navigate("/products");
        }, 200);
    }

    const responseGoogle = (response) => {
        // console.log(response);
        // console.log(response.profileObj);
        // setProfile(response.profileObj);
        postSocialData(response.profileObj);
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
            <Row>
                <Col>
                    <GoogleLogin
                        clientId="411475181756-ninurpsk7jq5dg6stkfrli2d368l2b0a.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Col>
            </Row>
        </div>
    )
}
