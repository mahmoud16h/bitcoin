import { configureStore } from '@reduxjs/toolkit'
import {pricesSlice} from "./prices/prices.slice";

export const store = configureStore({
    reducer: {
        prices: pricesSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
