import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import sweet from 'sweetalert2';

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
function Footer() {
    const [data, setData] = useState("");
    const [errors, setErrors] = useState("");

    const handler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (!regForEmail.test(value)) {
            setErrors("Uh-oh! Incorrect email!")
        }
        else {
            setData({ name: value })
            setErrors('')
        }
    }
    const subscribe = () => {
        if (data == '') {
            sweet.fire({
                title: `Enter your Email`,
                icon: "warning",
                timer: 4000
            })
        }
        else if (errors == '') {
            sweet.fire({
                title: `Thank you for subscribing! `,
                icon: "success",
                timer: 3000
            })
        }
    }
    return (
        <div>
            <div className="mt-5 pt-5 pb-5 footer" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-xs-12 about-company">
                            <h3>About Us</h3>
                            <p className="pr-5 text-white-50">NeoSOFT is a SEI-CMMI Level 5 and ISO 9001:2008 certified global IT consulting &
                                software solutions provider with 4000+ software consultants working full time across 8 delivery centers.</p>
                        </div>
                        <div className="col-lg-3 col-xs-12 links">
                            <h3 className="mt-lg-0 mt-sm-3">Information</h3>
                            <ul className="m-0 p-0">
                                <li><a href="https://images-na.ssl-images-amazon.com/images/G/01/rainier/help/legal/BSA_NA_English_redlined.pdf" target='_blank' >Terms and Conditions</a></li>

                            </ul>
                            <p className="pr-5 text-white-50">Gaurentee and return policy<br />Contact Us <br />Privacy policy<br />
                                <a href="https://www.google.com/maps/place/NeoSOFT+Technologies/@18.5790072,73.7365906,17z/data=!3m1!4b1!4m5!3m4!1s0x3bc2bbc1aaaaaaab:0x316090d140dfd0b3!8m2!3d18.579388!4d73.7388023" target="_blank">
                                    Locate Us</a> </p>

                        </div>

                        <div className="col-lg-4 col-xs-12">
                            <h5 className="text-uppercase mb-4">Sign up to our newsletter</h5>
                            <div className="form-outline form-white mb-4">
                                <input type="email" className="form-control"
                                    style={{ marginLeft: "-2px" }} onChange={handler} placeholder='johndoe@gmail.com' name="email" />
                                <p className='text-danger'>{errors}</p>
                            </div>
                            <Button variant="light" onClick={subscribe}>Subscribe</Button>
                        </div>

                    </div>
                    <div className="mt-5">
                        <div className="copyright">
                            <p className="pt-3 px-1 text-end"><small className="text-white">© chinmaykumbhare</small></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
