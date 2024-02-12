import {useEffect, useRef} from "react";
import {ColorType, createChart} from "lightweight-charts";

const Chart = ({data}) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (data == null) {
            return;
        }
        generateChart(data)
    }, [data])

    const generateChart = (data) => {
        const chart = createChart(chartContainerRef.current);
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350'
        });
        const filteredData = data.map(data => {
            const epoch = new Date(data.time).getTime() / 1000;
            return {
                time: epoch,
                open: data.open,
                high: data.high,
                low: data.low,
                close: data.close
            }
        })
        candlestickSeries.setData(filteredData);
        window.addEventListener('resize', () => {
            chart.resize(window.innerWidth, window.innerHeight);
        });
    }

    if (data == null) {
        return <div>Waiting for input...</div>
    }
    if (data.length === 0) {
        return <div ref={chartContainerRef}>No data</div>
    }
    return <div ref={chartContainerRef} style={{width: '100%', height: '100%'}}/>
}

export default Chart;