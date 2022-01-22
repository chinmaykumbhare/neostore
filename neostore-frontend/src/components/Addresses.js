import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { address_url, verify_url } from '../API/functionCalls';
import { Button, Form } from 'react-bootstrap';
import { getAddressDB, updateAddressDB, verifyTokenDB } from '../API/APICalls';

export default function Addresses() {

    const [token, setToken] = useState({});
    const [address, setAddress] = useState({});
    const [addAddress, setAddAddress] = useState({});
    const [show, setShow] = useState(false);

    const location = useLocation();

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

    return <div>
        <h3>Addresses</h3>
        <hr/>
        { (address.length > 1) && address.map(addr => {
            return (
                <>
                    <h3>{addr}</h3>
                    <hr/>
                </>
            )
        })}
        {(address.length === 1) && <><h3>{address}</h3><hr/></>}
        <Button onClick={() => {
            setShow(true);
        }}>+</Button>
        {show && (
            <>
                <h3 className='mt-3'>Add Address</h3>
                <input type={"text"} placeholder="221/B Baker's Street" onChange={(event) => {
                    setAddAddress(event.target.value);
                }} />
                <br/>
                <Button variant="success" onClick={() => {
                    const temp_address_array = address;
                    temp_address_array.push(addAddress);
                    console.log(temp_address_array);
                    setAddress(temp_address_array);
                    updateAddressDB(token, temp_address_array);
                }}>Submit</Button>
            </>
        )}
    </div>;
}
