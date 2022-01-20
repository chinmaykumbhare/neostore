import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { address_url, verify_url } from '../API/functionCalls';
import { Button, Form } from 'react-bootstrap';

export default function Addresses() {

    const [token, setToken] = useState({});
    const [address, setAddress] = useState({});
    const [addAddress, setAddAddress] = useState({});
    const [show, setShow] = useState(false);

    const location = useLocation();

    async function getAddress(username) {
        const data = await (await axios.post(address_url, { username: username })).data;
        console.log(data);
        console.log(data.length);
        setAddress(data);
    }

    useEffect(() => {

        async function verifyToken() {
            const _token = localStorage.getItem("token");
            const data = await (await axios.post(verify_url, { token: _token })).data;
            setToken(data);
            getAddress(data.username);
        }

        verifyToken();
    }, []);

    async function updateAddressDB(address_array) {
        const data = await (await axios.post("http://localhost:8090/addaddress", {id: token._id, address: address_array})).data;
        console.log(data);
    }

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
                    updateAddressDB(temp_address_array);
                }}>Submit</Button>
            </>
        )}
    </div>;
}
