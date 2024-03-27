import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {BASE_URL, WS_BASE_URL} from "../../../api";
import Button from "@mui/material/Button";

export default function Screener({setChartData, webSocketUrl, title}) {
    const [tickerData, setTickerData] = useState([]);
    const [wsStatus, setWsStatus] = useState('🟥')

    // const handleOpenChart = () => {
    //     setChartData({
    //         "time_frame": 'five_minutes',
    //         "exchange_token": "2885",
    //         "name": "Reliance",
    //         "trading_symbol": "RELIANCE",
    //     })
    //     // window.open(chartLink, '_blank');
    // };

    const handleOpenKiteChart = (chartLink) => {
        window.open(chartLink, '_blank');
    };

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

    return (
        <div style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'start',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        }}>
            <p style={{padding: 2, margin: 2, fontWeight: 'bold', color: '#2268ff', fontSize: '16px'}}>{title}: {wsStatus}</p>
            <TableContainer component={Paper}>
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
                            <TableCell align="right" sx={{fontSize: '12px'}}>Symbol</TableCell>
                            <TableCell align="right" sx={{fontSize: '12px'}}>Price</TableCell>
                            <TableCell align="right" sx={{fontSize: '12px'}}>Day Change</TableCell>
                            <TableCell align="right" sx={{fontSize: '12px'}}>Sector</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickerData.map((data, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleOpenKiteChart(data.KiteChartLink)}
                                sx={{cursor: 'pointer', '&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell sx={{fontSize: '12px'}} component="th" scope="row">
                                    {data.Time}
                                </TableCell>
                                <TableCell sx={{fontSize: '12px'}} align="right">{data.Symbol}</TableCell>
                                <TableCell sx={{fontSize: '12px'}} align="right"
                                           style={{color: data.Direction === 'BUY' ? 'green' : 'red'}}>
                                    {data.Price}
                                </TableCell>
                                <TableCell sx={{fontSize: '12px'}} align="right">{data.DayChangePercentage}</TableCell>
                                <TableCell sx={{fontSize: '12px'}} align="right">{data.Sector}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
