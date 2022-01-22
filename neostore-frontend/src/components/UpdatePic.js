import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import sweet from 'sweetalert2';
import { updatePicAPI, verifyTokenDB } from '../API/APICalls';

export default function UpdatePic() {

    const [file, setFile] = useState([]);
    const [token, setToken] = useState([]);

    useEffect(() => {

        async function verifyToken() {
            const data = await verifyTokenDB();
            setToken(data);
        }
        verifyToken();
    }, []);

    const sendData = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("id", token._id);
        const status = await updatePicAPI(data);
    }

    return (
        <div className='App container mt-3' style={{ minHeight: "100vh" }} >
            <h3>Please upload your photo</h3>
            <input type="file" id="file" accept='.jpg' onChange={(event) => {
                const file = event.target.files[0];
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
