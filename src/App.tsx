import React from 'react';
import './App.css';
import TickerComponent from "./components/ticker";
import usePricesSocket from "./hooks/usePricesSocket";

function App() {
    const { connected, connect, disconnect } = usePricesSocket();
    return (
        <div className="Ticker-Wrapper">
            <div className={`Connection-Status ${connected ? 'blink' : ''}`} style={{backgroundColor: connected ? 'green' : 'red'}} />
            <TickerComponent/>
            <div className="Button-Wrapper">
                <button className="Button" onClick={connect}>Open</button>
                <button className="Button" onClick={disconnect}>Close</button>
            </div>
        </div>
    );
}

export default App;
