import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

export default function Home() {
    return (
        <div className='App'>
            <div className='container'>
                <Row>
                    <Col className="border-end" style={{
                        display: "flex",
                        flexDirection: "column", minHeight: "100vh",
                        justifyContent: "center"
                    }} lg={3}>
                        <Link to="/login" className='mx-3 my-3 text-start text-white border'><FontAwesomeIcon icon="user"
                            className="mx-3" />Login</Link>
                        <Link to="/register" className='mx-3 my-3 text-start text-white border'><FontAwesomeIcon icon="user"
                            className="mx-3" />Register</Link>
                    </Col>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
