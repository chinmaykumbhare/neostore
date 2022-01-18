import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cart(state, action) {
            state.cart = [ ...state.cart ,action.payload];
        },
        remove(state, action) {
            state.cart = state.cart.filter(item => item.product.name !== action.payload.product.name);
        },
        setCart(state, action) {
            state.cart = action.payload;
        }
    }
});

export const {cart, remove, setCart} = cartSlice.actions;
export default cartSlice.reducer;