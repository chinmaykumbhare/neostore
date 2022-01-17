import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: []
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        data(state, action) {
            state.products = action.payload;
        }
    }
});

export const {data} = productSlice.actions;
export default productSlice.reducer;