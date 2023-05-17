import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface PricesState {
    BTCUSD: FormattedData
    BTCEUR: FormattedData
    BTCJPY: FormattedData
    BTCGBP: FormattedData
}

export type Prices = keyof PricesState

export interface FormattedData {
    BID?: number;
    BID_SIZE?: number;
    ASK?: number;
    ASK_SIZE?: number;
    DAILY_CHANGE?: number;
    DAILY_CHANGE_RELATIVE?: number;
    LAST_PRICE?: number;
    VOLUME?: number;
    HIGH?: number;
    LOW?: number;
}

const initialState: PricesState = {
    BTCUSD: {},
    BTCEUR: {},
    BTCJPY: {},
    BTCGBP: {},
}

export const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPricesForSymbol: (state, action: PayloadAction<{ data: FormattedData, symbol: Prices }>) => {
            state[action.payload.symbol] = action.payload.data
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPricesForSymbol } = pricesSlice.actions

export default pricesSlice.reducer
