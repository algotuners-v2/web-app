import React, { useState } from 'react';
import Screener from "../../components/screeners/screener";

export default function Dashboard() {
    const [chartData, setChartData] = useState([]);

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: "5px",
                    width: '95vw',
                    border: "solid 1px #ccc",
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    height: '100vh',
                }}>
                    <style>
                        {`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 5px !important;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: darkslategrey !important;
                        border-radius: 10px !important;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #ccc !important;
                    }
                `}
                    </style>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        flex: 1,
                        fontSize: '10px',
                        justifyContent: 'start',
                        overflow: 'auto',
                        alignItems: 'center',
                        borderBottom: "solid 0.5px #ccc",
                    }} className="custom-scrollbar">
                        <Screener setChartData={setChartData} webSocketUrl={"/day-range-breakout"} title={"Day\n" +
                            "                            range breakout"}/>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        flex: 1,
                        fontSize: '10px',
                        overflow: 'auto',
                        justifyContent: 'start',
                        alignItems: 'center',
                        borderTop: "solid 0.5px #ccc",
                    }} className="custom-scrollbar">
                        <Screener setChartData={setChartData} webSocketUrl={"/pattern/candle-reversal"} title={"Candle reversal pattern"}/>
                    </div>
                </div>
            </div>
        </>
    );
}
