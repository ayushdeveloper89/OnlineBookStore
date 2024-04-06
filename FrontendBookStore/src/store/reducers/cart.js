import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartId: null,
    cartArr: [],
};


const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setStoreCart(state, action) {
            state.cartId = action.payload.cartId;
            state.cartArr = action.payload.cartArr;
        },
        updateStoreCart(state, action) {
            state.cartArr = action.payload.cartArr;
        },
    }
});

export default cart.reducer;

export const { setStoreCart, updateStoreCart } = cart.actions;