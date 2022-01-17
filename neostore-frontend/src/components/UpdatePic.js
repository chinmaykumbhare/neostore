import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { verify_url } from "../API/functionCalls";
import sweet from 'sweetalert2';

export default function UpdatePic() {

    const [file, setFile] = useState([]);
    const [token, setToken] = useState([]);

    useEffect(() => {

        async function verifyToken() {
            const _token = localStorage.getItem("token");
            const data = await (await axios.post(verify_url, { token: _token })).data;
            setToken(data);
        }

        verifyToken();
    }, []);

    const sendData = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("id", token._id);
        const status = await axios.post("http://localhost:8090/updatepic", data);
        console.log(status);
    }

    return (
        <div className='App container mt-3' style={{ minHeight: "100vh" }} >
            <h3>Please upload your photo</h3>
            <input type="file" id="file" accept='.jpg' onChange={(event) => {
                const file = event.target.files[0];
                console.log(file);
                setFile(file);
            }} />
            <Button onClick={() => {
                sendData();
                sweet.fire({
                    title: `Profile picture updated successfully! `,
                    icon: "success",
                    timer: 3000
                });
                setTimeout(() => {
                    window.close();
                }, 3500);
            }}>Update</Button>
        </div>
    )
}
