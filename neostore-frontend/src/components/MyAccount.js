import React, { useEffect, useState } from 'react'
import NeostoreNavbar from './NeostoreNavbar'
import { Row, Col, Form } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { users_url } from '../API/functionCalls';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { verifyTokenDB } from '../API/APICalls';

library.add(faPenSquare);

export default function MyAccount() {

    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            const data = await verifyTokenDB();
            setUserData(data);
        }
        getUserData();
    }, [])

    return (
        <div className='App'>
            <NeostoreNavbar />
            <div className='container border border-white'>
                <h3 className='text-start'>My Account</h3>
                <Row className='my-3'>
                    <Col lg={5} className='border border-white mx-3'>
                        <img src={users_url + userData._id + ".jpg"} alt='profile pic'
                            style={{ height: "200px", width: "200px", objectFit: "cover", borderRadius: "50%", margin: "20px" }} ></img>
                        <FontAwesomeIcon onClick={() => {
                            window.open("http://localhost:3000/updatepic", "Upload!", "height=480, width=720");
                        }} icon="pen-square" />
                        <h5>{userData.username}</h5>
                        <hr />
                        <Form.Label className='mx-3 my-3 App-link' onClick={() => {
                            navigate("/myaccount/orders", { state: { viaMyAccount: true } });
                        }}>Orders</Form.Label>
                        <br />
                        <Link to="/forgotpassword" className='mx-3 my-3 App-link'>Change Password</Link>
                        <br />
                        <Form.Label className='mx-3 my-3 App-link' onClick={() => {
                            navigate("/myaccount/addresses", { state: { viaMyAccount: true } });
                        }}>Addresses</Form.Label>
                    </Col>
                    <Col lg={6} className='border border-white mx-1' style={{
                        height: "720px", overflowY: "scroll"
                    }}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
