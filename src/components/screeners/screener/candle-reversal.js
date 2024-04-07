import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {WS_BASE_URL} from "../../../api";

const tableContainerStyles = {
    marginRight: '5px',
    '&::-webkit-scrollbar': {
        width: '2px', // Set the width of the scrollbar to make it thin
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'darkgrey', // Optional: style for the draggable part
    }
};


export default function CandleReversalScreener({webSocketUrl, title}) {
    const [tickerData, setTickerData] = useState([]);
    const [wsStatus, setWsStatus] = useState('🟥')

    const handleOpenKiteChart = (chartLink) => {
        window.open(chartLink, '_blank');
    };

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
        const ws = new WebSocket('wss://' + WS_BASE_URL + webSocketUrl);
        ws.onopen = () => {
            console.log('WebSocket Connected' + webSocketUrl);
            setWsStatus('🟢')
            ws.pingInterval = setInterval(() => {
                ws.send('ping');
            }, 5000);
        };
        ws.onmessage = (event) => {
            if (event.data === 'pong') {
                return;
            }
            const data = JSON.parse(event.data);
            setTickerData((prevData) => [data, ...prevData.slice(0, 40)]);
        };
        ws.onerror = (error) => {
            setWsStatus('🟥')
            console.log('WebSocket Error: ', error);
        };
        ws.onclose = () => {
            setWsStatus('🟥')
            console.log('WebSocket Disconnected');
        };
        return () => {
            setWsStatus('🟥')
            ws.close();
        }
    }, []);

    const buyData = tickerData.filter((data) => data.Direction === 'BUY');
    const sellData = tickerData.filter((data) => data.Direction === 'SELL');

    const renderTable = (data, direction) => (
        <TableContainer component={Paper} style={{marginRight: direction === 'BUY' ? '5px' : '0'}} sx={tableContainerStyles}>
            <Table padding={'none'} aria-label="simple table" sx={{fontWeight: 'light'}}>
                <TableHead sx={{
                    width: 1,
                    p: 0,
                    m: 0,
                    fontWeight: 'light',
                    fontSize: '5px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
                }}>
                    <TableRow>
                        <TableCell sx={{fontSize: '12px'}}>Time</TableCell>
                        <TableCell align="left" sx={{fontSize: '12px'}}>Symbol</TableCell>
                        <TableCell align="left" sx={{fontSize: '12px'}}>Price</TableCell>
                        <TableCell align="left" sx={{fontSize: '12px'}}>Sector</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            onClick={() => handleOpenKiteChart(row.KiteChartLink)}
                            style={{cursor: 'pointer', color: direction === 'BUY' ? 'green' : 'red'}}
                            sx={{cursor: 'pointer', '&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell sx={{fontSize: '12px'}} component="th" scope="row">{row.Time}</TableCell>
                            <TableCell sx={{fontSize: '12px'}} align="left">{row.Symbol}</TableCell>
                            <TableCell sx={{fontSize: '12px'}} style={{color: direction === 'BUY' ? 'green' : 'red'}} align="left">{row.Price}</TableCell>
                            <TableCell sx={{fontSize: '12px'}} align="left">{row.Sector}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            border: '1px solid #fff',
            borderRadius: '5px'
        }}>
            <p style={{padding: 2, margin: 2, fontWeight: 'bold', color: '#2268ff', fontSize: '16px'}}>
                {title}: {wsStatus}
            </p>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%',
                height: '94%',}}>
                {renderTable(buyData, 'BUY')}
                {renderTable(sellData, 'SELL')}
            </div>
        </div>
    );
}
