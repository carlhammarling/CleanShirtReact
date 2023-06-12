import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'
import searchSlice from './features/searchSlice'

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        search: searchSlice
    }
})