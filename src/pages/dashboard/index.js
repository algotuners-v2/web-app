import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import DayRangeBreakoutScreener from "../../components/screeners/screener/day-range-breakout";
import CandleReversalScreener from "../../components/screeners/screener/candle-reversal";
import {
    candleReversalScreenerWsRequest15min, candleReversalScreenerWsRequest1Day,
    candleReversalScreenerWsRequest5min, candleReversalScreenerWsRequest60min,
    dayRangeBreakoutScreenerWsRequest, marketInfoScreenerWsRequest, velocityStocksScreenerWsRequest
} from "../../api/ws_helper";
import MarketInfoScreener from "../../components/screeners/screener/market-info-screener";
import {useAuth} from "../auth/auth_context";
import {useNavigate} from "react-router-dom";

const scrollBarStyle = {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        height: '2px',
        width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'darkgrey',
    }
};

const MemoizedDayRangeBreakoutScreener = React.memo(DayRangeBreakoutScreener);
const MemoizedCandleReversalScreener = React.memo(CandleReversalScreener);



export default function Dashboard() {
    const { authToken, username, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(authToken !== "") {
            return
        } else {
            handleLogout()
        }
    }, [])

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            padding: "5px",
            width: '100vw',
            height: '100vh',
            ...scrollBarStyle
        }}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", padding: "5px"}}>
                <MarketInfoScreener connectionRequestMessage={marketInfoScreenerWsRequest} title={"market Info screener"}/>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 1, md: 1}}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        fontSize: '10px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        padding: '5px',
                        minWidth: '600px',
                        height: '450px'
                    }}>
                        <MemoizedDayRangeBreakoutScreener connectionRequestMessage={dayRangeBreakoutScreenerWsRequest} title={"Day\n" +
                            "                            range breakout"}/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        fontSize: '10px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        padding: '5px',
                        minWidth: '600px',
                        height: '450px'
                    }}>
                        <MemoizedCandleReversalScreener connectionRequestMessage={candleReversalScreenerWsRequest15min}
                                                        title={"Candle reversal pattern [15m]"}/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        fontSize: '10px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        padding: '5px',
                        minWidth: '600px',
                        height: '450px'
                    }}>
                        <MemoizedCandleReversalScreener connectionRequestMessage={candleReversalScreenerWsRequest5min}
                                                        title={"Candle reversal pattern [5m]"}/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        fontSize: '10px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        padding: '5px',
                        minWidth: '600px',
                        height: '450px'
                    }}>
                        <MemoizedCandleReversalScreener connectionRequestMessage={velocityStocksScreenerWsRequest} title={"Stocks Velocity [tick]"}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
