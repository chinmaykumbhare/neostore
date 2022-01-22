import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from '../components/Products';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Order from '../components/Order';
import Orders from '../components/Orders';
import ForgotPassword from '../components/ForgotPassword';
import MyAccount from '../components/MyAccount';
import Product from '../components/Product';
import Footer from '../components/Footer';
import UpdatePic from '../components/UpdatePic';
import Addresses from '../components/Addresses';
import App from '../App';

export default function NeoRoutes() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/seller" element={<App />} />
                    <Route path="/products" element={<Products />} ></Route>
                    <Route path="/" element={<Home />} >
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                    </Route>
                    <Route path="/order" element={<Order />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/myaccount" element={<MyAccount />} >
                        <Route path="orders" element={<Orders />} />
                        <Route path="addresses" element={<Addresses />} />
                    </Route>
                    <Route path="/product" element={<Product />} />
                    <Route path="/updatepic" element={<UpdatePic />} />
                </Routes>
            </Router>
            <Footer />
        </>
    )
}
