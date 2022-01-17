import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './App.css'

function App() {

  const [file, setFile] = useState({});
  const [name, setName] = useState("");
  const [catid, setCatid] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await (await axios.get("http://localhost:8090/categories")).data;
      setCategories(data);
    }

    async function checkCredentials() {
      const data = await (await axios.post("http://localhost:8090/verify", {token: localStorage.getItem("token")})).data;
      console.log(data);
      if(data.seller !== true) {
        navigate("/products");
      }
    }

    checkCredentials();
    getData();
  }, []);

  const sendData = async() => {
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("catid", catid);
    data.append("price", price);
    const status = await axios.post("http://localhost:8090/upload", data);
    console.log(status);
  }

  return (
    <div className="App">
      <h3>Insert Data:</h3>
      <input type="text" placeholder='product name' required onChange={event => setName(event.target.value)} />
      <br/>
      <Dropdown>
        <Dropdown.Toggle>Select Category</Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => {
                setCatid(category._id);
              }}>{category.category}</Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
      <br/>
      <input type="file" id="file" accept='.jpg' onChange={(event) => {
        const file = event.target.files[0];
        console.log(file);
        setFile(file);
      }} />
      <br/>
      <input type="number" placeholder='price' required onChange={event => setPrice(event.target.value)} />
      <br/>
      <button className='btn btn-primary' onClick={sendData}>Upload</button>
      <br/>
      {/* <img src='http://localhost:8090/products/sofa1.jpg' /> */}
    </div>
  )
}

export default App
