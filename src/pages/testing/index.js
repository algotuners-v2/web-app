import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import DayRangeBreakoutScreener from "../../components/screeners/screener/day-range-breakout";
import CandleReversalScreener from "../../components/screeners/screener/candle-reversal";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {WS_BASE_URL} from "../../api";
import {
    candleReversalScreenerWsRequest15min, candleReversalScreenerWsRequest1Day,
    candleReversalScreenerWsRequest5min, candleReversalScreenerWsRequest60min,
    dayRangeBreakoutScreenerWsRequest, velocityStocksScreenerWsRequest
} from "../../api/ws_helper";

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



export default function Testing() {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
            <div style={{
                width: '100%',
                maxWidth: '600px',
                marginBottom: '10px',
            }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered aria-label="icon label tabs example">
                    <Tab label="INTRADAY"/>
                    <Tab label="SWING"/>
                </Tabs>
            </div>
            { tabValue === 0 && <div style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
            }}>
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
            </div>}
            { tabValue === 1 && <div style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
            }}>
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
                            <MemoizedCandleReversalScreener connectionRequestMessage={candleReversalScreenerWsRequest60min}
                                                            title={"Candle reversal pattern [60m]"}/>
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
                            <MemoizedCandleReversalScreener connectionRequestMessage={candleReversalScreenerWsRequest1Day}
                                                            title={"Candle reversal pattern [1D]"}/>
                        </div>
                    </Grid>
                </Grid>
            </div>}
        </div>
    );
}
