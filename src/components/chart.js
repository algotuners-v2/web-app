import {useEffect, useRef} from "react";
import {ColorType, createChart} from "lightweight-charts";

const Chart = ({data}) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (data == null) {
            return;
        }
        let destroyChartCallback = generateChart(data)
        return () => {
            if (destroyChartCallback) {
                destroyChartCallback();
            }
        };
    }, [data])

    const generateChart = (data) => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {type: ColorType.Solid, color: 'white'},
                textColor: 'black'
            },
            height: '900',
            width: '1500',
            grid: {
                horzLines: {
                    visible: false,
                },
                vertLines: {
                    visible: false,
                }
            }
        });
        const handleResize = () => {
            chart.applyOptions({width: chartContainerRef.current.clientWidth});
        };
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
        chart.timeScale().fitContent();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        }
    }

    if (data == null) {
        return <div>Waiting for input...</div>
    }
    if (data.length === 0) {
        return <div ref={chartContainerRef} style={{width: '100%', height: '100%'}}>No data</div>
    }
    return <div ref={chartContainerRef} style={{width: '100%', height: '100%'}} />
}

export default Chart;