import React from 'react';
import { useSelector} from "react-redux";
import {getPricesSelector} from "../../store/prices/prices.selectors";

const formatPrice = (price?: number) => {
    if (!price) return null
    return price.toLocaleString("en-US")
}

function TickerComponent() {
    const prices = useSelector(getPricesSelector)

    return (
        <div>
            <div>BTC/USD: {formatPrice(prices?.BTCUSD?.LAST_PRICE)}</div>
            <div>BTC/EUR: {formatPrice(prices?.BTCEUR?.LAST_PRICE)}</div>
            <div>BTC/JPY: {formatPrice(prices?.BTCJPY?.LAST_PRICE)}</div>
            <div>BTC/GBP: {formatPrice(prices?.BTCGBP?.LAST_PRICE)}</div>
        </div>
    );
}

export default TickerComponent;
