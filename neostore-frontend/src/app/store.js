import {configureStore} from '@reduxjs/toolkit';
import cartSlice from '../features/products/cartSlice';
import categoriesSlice from '../features/products/categoriesSlice';
import productsSlice from '../features/products/productsSlice';

export const store = configureStore({
    reducer: {
        posts: productsSlice,
        categories: categoriesSlice,
        cart: cartSlice,
    },
});