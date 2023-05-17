import React from 'react';
import { useSelector} from "react-redux";
import {getPricesSelector} from "../../store/prices/prices.selectors";

function TickerComponent() {
    const prices = useSelector(getPricesSelector)

    return (
        <div>
            <div>BTC/USD: {prices?.BTCEUR?.LAST_PRICE}</div>
            <div>BTC/EUR: {prices?.BTCEUR?.LAST_PRICE}</div>
            <div>BTC/JPY: {prices?.BTCJPY?.LAST_PRICE}</div>
            <div>BTC/GBP: {prices?.BTCGBP?.LAST_PRICE}</div>
        </div>
    );
}

export default TickerComponent;
