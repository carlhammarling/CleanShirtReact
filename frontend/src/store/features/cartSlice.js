import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  cart: [],
  totQty: 0,
  totAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //function that can add to cart.
    addToCart: (state, action) => {
      //Check if product with that size allready is in the cart.
      const existingProduct = state.cart.find(
        (item) =>
          item.product._id === action.payload._id &&
          item.product.size == action.payload.size
      );

      existingProduct
        ? //If it exists in the cart + 1
          (existingProduct.quantity += 1)
        : (state.cart = [
            ...state.cart,
            { product: action.payload, quantity: 1, id: uuid() },
          ]);
    },
    incrementOneProduct: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      existingProduct.quantity += 1;
    },
    decrementOneProduct: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      existingProduct.quantity <= 1
        ? //Keeps all that does not match the id of the selected product.
          (state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          ))
        : (existingProduct.quantity -= 1);
    },
    removeOneProduct: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  addToCart,
  removeOneProduct,
  decrementOneProduct,
  incrementOneProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
