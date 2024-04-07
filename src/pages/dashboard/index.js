import React from 'react';
import Screener from "../../components/screeners/screener";
import Grid from '@mui/material/Grid';
import DayRangeBreakoutScreener from "../../components/screeners/screener/day-range-breakout";
import CandleReversalScreener from "../../components/screeners/screener/candle-reversal";

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


export default function Dashboard() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'center',
            padding: "5px",
            width: '100vw',
            height: '100vh',
            ...scrollBarStyle
        }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
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
                        <DayRangeBreakoutScreener webSocketUrl={"/day-range-breakout"} title={"Day\n" +
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
                        <CandleReversalScreener webSocketUrl={"/pattern/candle-reversal"} title={"Candle reversal pattern"}/>
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
                        <CandleReversalScreener webSocketUrl={"/velocity-stocks"} title={"Stocks Velocity"}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
