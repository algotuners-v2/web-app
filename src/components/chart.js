import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { historicalData } from "../pages/charting/api";

const convertToEpochTime = (timestamp) => {
    const offset = 5.5 * 60 * 60 * 1000;
    const utcTime = new Date(timestamp).getTime();
    const istTime = utcTime + offset;
    return istTime / 1000;
}

const Chart = ({ config }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [earliestTime, setEarliestTime] = useState(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        if (!chartRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.offsetWidth,
                height: chartContainerRef.current.offsetHeight,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                }
            });
            seriesRef.current = chartRef.current.addCandlestickSeries();
            window.addEventListener('resize', resizeListener);
        }

        async function loadData() {
            if (!config || !config.exchange_token || !config.interval_in_seconds) return;
            setIsLoading(true);
            const endTime = new Date();
            const response = await historicalData(config.exchange_token, config.interval_in_seconds, 8, endTime);
            setIsLoading(false);
            setData(response.data);
            if (response.data.length > 0) {
                const earliest = response.data.reduce((min, p) => p.time < min ? p.time : min, response.data[0].time);
                setEarliestTime(convertToEpochTime(earliest));
            }
        }

        loadData();

        function resizeListener() {
            if (chartRef.current) {
                chartRef.current.resize(chartContainerRef.current.offsetWidth, chartContainerRef.current.offsetHeight);
            }
        }

        return () => {
            window.removeEventListener('resize', resizeListener);
            if (chartRef.current) {
                chartRef.current.timeScale().unsubscribeVisibleTimeRangeChange(loadAdditionalData);
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [config]);

    useEffect(() => {
        if (!seriesRef.current || !data.length) return;
        const formattedData = data.map(d => ({
            time: convertToEpochTime(d.time),
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
        })).sort((a, b) => a.time - b.time);

        const deduplicatedData = formattedData.reduce((acc, cur) => {
            const lastItem = acc[acc.length - 1];
            if (!lastItem || lastItem.time !== cur.time) {
                acc.push(cur);
            }
            return acc;
        }, []);

        seriesRef.current.setData(deduplicatedData);
    }, [data]);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.timeScale().subscribeVisibleTimeRangeChange(loadAdditionalData);
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.timeScale().unsubscribeVisibleTimeRangeChange(loadAdditionalData);
            }
        };
    }, [earliestTime, loadAdditionalData]);

    async function loadAdditionalData(range) {
        const needMoreData = range.from <= earliestTime;
        if (needMoreData && !isLoading) {
            setIsLoading(true);
            const moreData = await historicalData(config.exchange_token, config.interval_in_seconds, 8, new Date(earliestTime * 1000));
            setIsLoading(false);
            const newData = [...moreData.data, ...data];
            setData(newData);
            if (moreData.data.length > 0) {
                const earliest = moreData.data.reduce((min, p) => p.time < min ? p.time : min, moreData.data[0].time);
                setEarliestTime(convertToEpochTime(earliest));
            }
        }
    }

    return (
        <div ref={chartContainerRef} style={{ height: "100%", position: "relative", border: "1px solid grey", backgroundColor: "white", display: "flex", flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}> {/* Ensure some default height is set */}
            {isLoading ? "Loading..." : data == null || !data.length ? "No data" : null}
        </div>
    );
};

export default Chart;
