import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {BASE_URL, WS_BASE_URL} from "../../../api";

export default function DayRangeBreakout() {
    const [tickerData, setTickerData] = useState([]);

    const handleOpenChart = (chartLink) => {
        window.open(chartLink, '_blank');
    };

    useEffect(() => {
        const ws = new WebSocket('ws://' + WS_BASE_URL + "/day-range-breakout");

        ws.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTickerData((prevData) => [data, ...prevData]);
        };

        ws.onerror = (error) => {
            console.log('WebSocket Error: ', error);
        };

        ws.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        return () => ws.close();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Direction</TableCell>
                        <TableCell align="right">Day Change</TableCell>
                        <TableCell align="right">Kite V2 Charts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickerData.map((data, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.Time}
                            </TableCell>
                            <TableCell align="right">{data.Symbol}</TableCell>
                            <TableCell align="right">{data.Price}</TableCell>
                            <TableCell align="right">{data.Direction}</TableCell>
                            <TableCell align="right">{data.DayChangePercentage}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpenChart(data.KiteChartLink)}
                                >
                                    Open Chart
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
