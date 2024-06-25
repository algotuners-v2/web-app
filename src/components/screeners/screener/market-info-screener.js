import * as React from 'react';
import { useState, useEffect } from 'react';
import {WS_BASE_URL} from "../../../api";
import {pingWsRequest, pongWsResponse} from "../../../api/ws_helper";
import {useAuth} from "../../../pages/auth/auth_context";


export default function MarketInfoScreener({connectionRequestMessage, title}) {
    const [marketInfo, setMarketInfo] = useState([]);
    const { authToken } = useAuth();


    function generateMockData() {
        // Mock symbols and sectors for the data
        const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB'];
        const sectors = ['Technology', 'Healthcare', 'Finance', 'Consumer Goods', 'Utilities'];

        // Function to generate random data for a row
        const generateRow = () => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            const price = (Math.random() * 1000 + 100).toFixed(2);
            const dayChange = (Math.random() * 10 - 5).toFixed(2);
            const direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
            const sector = sectors[Math.floor(Math.random() * sectors.length)];
            const time = new Date().toTimeString().split(' ')[0]; // current time

            return {
                Time: time,
                Symbol: symbol,
                Price: price,
                DayChangePercentage: dayChange,
                Direction: direction,
                Sector: sector,
                KiteChartLink: `https://www.example.com/chart/${symbol}`
            };
        };
        return generateRow();
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         const mockData = generateMockData();
    //         setTickerData((prevData) => [mockData, ...prevData.slice(0, 60)]);
    //     }, 1000)
    // }, []);


    useEffect(() => {
        const ws = new WebSocket(`wss://${WS_BASE_URL}?token=${authToken}`);
        ws.onopen = () => {
            console.log('WebSocket Connected' + JSON.stringify(connectionRequestMessage));
            ws.send(JSON.stringify(connectionRequestMessage))
            ws.pingInterval = setInterval(() => {
                ws.send(JSON.stringify(pingWsRequest));
            }, 5000);
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data === pongWsResponse) {
                return;
            }
            setMarketInfo(data);
        };
        ws.onerror = (error) => {
            console.log('WebSocket Error: ', error);
        };
        ws.onclose = () => {
            clearInterval(ws.pingInterval);
            console.log('WebSocket Disconnected');
        };
        return () => {
            ws.close();
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            height: '30px',
            margin: 0,
            padding: 0,
        }}>
            <div>
                <h4>Stocks DR score: {marketInfo.StocksDayRangeScore}</h4>
            </div>
        </div>
    );
}
