import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Total() {

    const [total, setTotal] = useState(0);

    const globalCart = useSelector(state => state.cart.cart);

    useEffect(() => {
        let temp_total = 0;
        globalCart.map((item) => {
            temp_total += item.product.price * item.quantity;
        })
        setTotal(temp_total);
    }, [globalCart]);

    return (
        <div>
            <span>Total:</span> <span style={{ float: "right" }}>{
                new Intl.NumberFormat('en-IN', {
                    style: "currency",
                    currency: "INR"
                }).format(total)}</span>
        </div>
    )
}
