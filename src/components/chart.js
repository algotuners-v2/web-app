import {useEffect, useRef, useState} from "react";
import {createChart} from "lightweight-charts";
import {historicalData} from "../pages/charting/api";
import {useTheme} from "@mui/material/styles";
import {CircularProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";

const convertToEpochTime = (timestamp) => {
    const offset = 5.5 * 60 * 60 * 1000;
    const utcTime = new Date(timestamp).getTime();
    const istTime = utcTime + offset;
    return istTime / 1000;
}

const Chart = ({config, isLoading, setIsLoading}) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const [data, setData] = useState([]);
    const [earliestTime, setEarliestTime] = useState(null);
    const theme = useTheme();

    const calcNumberOfDaysRequiredToLoadChartData = () => {
        const intervalInSeconds = config.interval_in_seconds;
        const totalSeconds = intervalInSeconds * 2000;
        const secondsInADay = 6 * 60 * 60;
        return totalSeconds / secondsInADay;
    }

    useEffect(() => {
        if (!chartContainerRef.current) return;
        if (!chartRef.current) {
            const chart = createChart(chartContainerRef.current, {
                crosshair: {
                    mode: 0,
                },
                layout: {
                    background: {
                        color: theme.palette.primary.dark,
                        textColor: '#fff',
                    }
                },
                grid: {
                    vertLines: {
                        color: '#444',
                    },
                    horzLines: {
                        color: '#444',
                    }
                },
                width: chartContainerRef.current.offsetWidth,
                height: chartContainerRef.current.offsetHeight,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                    borderColor: '#404040',
                    textColor: 'white',
                },
            });
            chart.timeScale().fitContent();
            chart.priceScale('right').applyOptions({
                    borderVisible: true,
                    borderColor: '#404040',
                    entireTextOnly: true,
                    textColor: 'white',
            })
            chartRef.current = chart
            seriesRef.current = chartRef.current.addCandlestickSeries({
                color: '#2962FF',
            });
            seriesRef.current.applyOptions({
                wickUpColor: 'rgb(54, 116, 217)',
                upColor: 'rgb(54, 116, 217)',
                wickDownColor: 'rgb(225, 50, 85)',
                downColor: 'rgb(225, 50, 85)',
                borderVisible: false,
            });
            window.addEventListener('resize', resizeListener);
        }

        async function loadData() {
            if (!config || !config.exchange_token || !config.interval_in_seconds) return;
            setIsLoading(true);
            const endTime = new Date();
            endTime.setHours(9);endTime.setMinutes(15);endTime.setSeconds(0);
            const response = await historicalData(config.exchange_token, config.interval_in_seconds, calcNumberOfDaysRequiredToLoadChartData(), endTime);
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
            const endTime = new Date(earliestTime * 1000);
            endTime.setHours(9);endTime.setMinutes(15);endTime.setSeconds(0);
            const moreData = await historicalData(config.exchange_token, config.interval_in_seconds, calcNumberOfDaysRequiredToLoadChartData(), endTime);
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
        <div ref={chartContainerRef} style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }} />
    );
};

export default Chart;
