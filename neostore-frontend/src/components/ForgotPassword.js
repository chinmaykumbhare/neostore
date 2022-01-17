import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {user_url, reset_url, otp_url} from '../API/functionCalls';
import sweet from "sweetalert2";

export default function ForgotPassword() {

    const [username, setUsername] = useState("");
    const [userdata, setUserData] = useState([]);
    const [otp, setOTP] = useState(0);
    const [inputOTP, setInputOTP] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    async function otpHandler() {
        const data = await (await axios.post(user_url, { username: username })).data;
        console.log(data);
        setUserData(data);
    }

    async function resetPassword() {
        const data = await (await axios.post(reset_url, {username: username, password: password})).data;
        console.log(data);
        sweet.fire({
            title: "Your password has been reset successfully! ",
            icon: "success",
            timer: 3000
        })
    }

    useEffect(() => {
        async function getOTP() {
            const data = await (await axios.post(otp_url, {username: username})).data;
            console.log(data);
            setOTP(data);
        }
        if (userdata.length > 0) {
            getOTP();
        }
    }, [userdata])

    return (
        <div>
            <h3>Reset Your Password</h3>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>username</Form.Label>
                    <Col sm={9}>
                        <Form.Control placeholder='johndoe' type='text' onChange={event => setUsername(event.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Button onClick={otpHandler}>Get OTP</Button>
                <hr />
                {userdata.length > 0 && (
                    <>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Enter OTP</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="XXXX" type='password' onChange={event => setInputOTP(event.target.value)} />
                            </Col>
                        </Form.Group>
                        <hr />
                    </>
                )}
                {(otp !== 0 && otp == inputOTP) && (
                    <>
                        <h3>Enter New Password</h3>
                        <Form.Group as={Row} className="text-end">
                            <Form.Label column sm={3}>password</Form.Label>
                            <Col sm={9}>
                                <Form.Control type='password' onChange={event => setPassword(event.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="text-end">
                            <Form.Label column sm={3}>confirm password</Form.Label>
                            <Col sm={9}>
                                <Form.Control type='password' onChange={event => setCPassword(event.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        { (password !== "" && password === cpassword) && <Button onClick={() => resetPassword()}>Reset Password</Button>}
                    </>
                )}
            </Form>
        </div>
    )
}
