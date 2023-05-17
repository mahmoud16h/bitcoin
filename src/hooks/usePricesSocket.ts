import { useDispatch } from "react-redux";
import {useRef, useState} from "react";
import { Prices, setPricesForSymbol } from "../store/prices/prices.slice";
import { tickerDataFormatter } from "../utils/tickerDataFormatter";

export const usePricesSocket = () => {
    const dispatch = useDispatch();
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    let reconnectAttempts = 10;

    let heartbeatTimer: NodeJS.Timeout;

    const connect = () => {
        if (wsRef.current) {
            console.log("WebSocket is already open");
            return;
        }

        const newWs = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
        const channelSymbolMap: { [x: string]: string } = {};

        const subMsg = (symbol: string) => JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol,
        });

        newWs.onopen = () => {
            console.log("WebSocket connection opened");
            setConnected(true);
            reconnectAttempts = 10;
            newWs.send(subMsg("tBTCUSD"));
            newWs.send(subMsg("tBTCEUR"));
            newWs.send(subMsg("tBTCJPY"));
            newWs.send(subMsg("tBTCGBP"));
        };

        newWs.onmessage = (msg) => {
            const data = JSON.parse(msg.data);

            if (data.event === "subscribed") channelSymbolMap[data.chanId] = data.pair;

            if (!!data.length && data[1] !== "hb") {
                const symbol = channelSymbolMap[data[0]] as Prices;
                if (symbol) {
                    const formattedData = tickerDataFormatter(data);
                    dispatch(setPricesForSymbol({ symbol, data: formattedData }));
                }
            }

            if (data[1] === 'hb') {
                clearTimeout(heartbeatTimer);
                console.log('heartbeat')
                heartbeatTimer = setTimeout(() => {
                    console.error("Haven't received heartbeat for 15 seconds, connection might be lost.");
                    setConnected(false);
                    reconnect();
                }, 20000);
            }

        };

        newWs.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnected(false);
            reconnect()
        };

        newWs.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
            setConnected(false);
            reconnect()
        };

        wsRef.current = newWs;
    };

    const reconnect = () => {
        if (wsRef.current && reconnectAttempts > 0) {
            clearTimeout(heartbeatTimer);
            wsRef.current = null;

            reconnectAttempts--;

            setTimeout(() => {
                console.log('trying to reconnect again')
                connect();
            }, 2000);
        }
    };

    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close();
            clearTimeout(heartbeatTimer);
            wsRef.current = null;
        } else {
            console.log("WebSocket is already closed");
        }
    };

    return { connected, connect, disconnect };
};

export default usePricesSocket;
