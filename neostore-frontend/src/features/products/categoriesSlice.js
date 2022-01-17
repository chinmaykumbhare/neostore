import {createSlice, createAction} from '@reduxjs/toolkit';

const initialState = {
    categories: []
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        category(state, action) {
            state.categories = action.payload;
        }
    }
});

export const {category} = categoriesSlice.actions;
export default categoriesSlice.reducer;