import ChartScreen from "../../components/charting";
import Screener from "../../components/screeners/screener";
import {useState} from "react";


export default function Dashboard() {
    const [chartData, setChartData] = useState([])
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
        }}>
            {/*<div style={{*/}
            {/*    display: 'flex',*/}
            {/*    flex: 1,*/}
            {/*    height: '100vh',*/}
            {/*    width: '100vw',*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',*/}
            {/*}} >*/}
            {/*    <ChartScreen chartData={chartData}/>*/}
            {/*</div>*/}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: "5px",
                width: '80vw',
                border: "solid 1px #ccc",
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px',
                height: '100vh'
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    flex: 1,
                    fontSize: '10px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    borderBottom: "solid 0.5px #ccc"
                }}>
                    <p style={{padding: 2, margin: 2, alignSelf: 'start', fontWeight: 'bold', color: '#2268ff', fontSize: '16px'}}>Day range breakout</p>
                    <Screener setChartData={setChartData} webSocketUrl={"/day-range-breakout"}/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    flex: 1,
                    fontSize: '10px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    borderTop: "solid 0.5px #ccc"
                }}>
                    <p style={{padding: 2, margin: 2, alignSelf: 'start', fontWeight: 'bold', color: '#2268ff', fontSize: '16px'}}>Candle reversal pattern</p>
                    <Screener setChartData={setChartData} webSocketUrl={"/pattern/candle-reversal"}/>
                </div>
            </div>
        </div>
    );
}