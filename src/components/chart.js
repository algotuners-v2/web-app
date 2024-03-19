import {useEffect, useRef, useState} from "react";
import {createChart} from "lightweight-charts";
import {getSupportResistanceData, todayOhlcData} from "./charting/api";
import {useTheme} from "@mui/material/styles";

const convertToEpochTime = (timestamp) => {
    const istTime = new Date(timestamp).getTime();
    return istTime / 1000;
}

const Chart = ({config, isLoading, setIsLoading}) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const [data, setData] = useState([]);
    const [supportResistanceData, setSupportResistanceData] = useState([]);
    const [earliestTime, setEarliestTime] = useState(null);
    const theme = useTheme();
    const [lastConfig, setLastConfig] = useState(null);

    const calcNumberOfDaysRequiredToLoadChartData = () => {
        const intervalInSeconds = config.interval_in_seconds;
        const totalSeconds = intervalInSeconds * 2000;
        const secondsInADay = 6 * 60 * 60;
        return totalSeconds / secondsInADay;
    }

    async function loadSupportResistanceData(candles) {
        if (!candles || !candles.length) return;
        setIsLoading(true);
        try {
            const response = await getSupportResistanceData(candles);
            setIsLoading(false);
            setSupportResistanceData(response.data);
        } catch (e) {
            console.log(e)
        }
    }

    async function loadData() {
        if (!config || !config.exchange_token || !config.time_frame) return;
        setIsLoading(true);
        const endTime = new Date();
        endTime.setHours(9);endTime.setMinutes(15);endTime.setSeconds(0);
        const response = await todayOhlcData(config.exchange_token, config.time_frame)
        // const response = await historicalData(config.exchange_token, config.time_frame, calcNumberOfDaysRequiredToLoadChartData(), endTime);
        setIsLoading(false);
        setData(response.data);
        // if (config.show_support_resistance_levels) {
        //     await loadSupportResistanceData(response.data)
        // }
        if (response.data.length > 0) {
            const earliest = response.data.reduce((min, p) => p.time < min ? p.time : min, response.data[0].time);
            setEarliestTime(convertToEpochTime(earliest));
        }
    }

    async function loadAdditionalData(range) {
        // const needMoreData = range.from <= earliestTime;
        // if (needMoreData && !isLoading) {
        //     setIsLoading(true);
        //     const endTime = new Date(earliestTime * 1000);
        //     endTime.setHours(9);endTime.setMinutes(15);endTime.setSeconds(0);
        //     const moreData = await historicalData(config.exchange_token, config.interval_in_seconds, calcNumberOfDaysRequiredToLoadChartData(), endTime);
        //     setIsLoading(false);
        //     const newData = [...moreData.data, ...data];
        //     setData(newData);
        //     if (config.show_support_resistance_levels) {
        //         await loadSupportResistanceData(moreData.data)
        //     }
        //     if (moreData.data.length > 0) {
        //         const earliest = moreData.data.reduce((min, p) => p.time < min ? p.time : min, moreData.data[0].time);
        //         setEarliestTime(convertToEpochTime(earliest));
        //     }
        // }
    }

    function resizeListener() {
        if (chartRef.current) {
            chartRef.current.resize(chartContainerRef.current.offsetWidth, chartContainerRef.current.offsetHeight);
        }
    }

    const levelMarkerColor = (count) => {
        if (count === 1) {
            return "#FFF7F1"
        } else if (count === 2) {
            return "#FFE4C9"

        } else if (count === 3) {
            return "#FFBB64"

        } else if (count >= 4) {
            return "#FF6868"

        }
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
                    },
                    textColor: '#fff',
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
                    borderColor: '#fff',
                    textColor: '#fff',
                    allowBoldLabels: true,
                },
            });
            chart.timeScale().fitContent();
            chart.priceScale('right').applyOptions({
                    borderVisible: true,
                    borderColor: '#fff',
                    entireTextOnly: true,
                    textColor: '#fff',
            })
            chartRef.current = chart
            seriesRef.current = chartRef.current.addCandlestickSeries({
                color: '#2962FF',
            })
            seriesRef.current.applyOptions({
                wickUpColor: '#0A9981',
                upColor: '#0A9981',
                wickDownColor: 'rgb(225, 50, 85)',
                downColor: 'rgb(225, 50, 85)',
                borderVisible: false,
            });
            window.addEventListener('resize', resizeListener);
        }
        loadData();
        setLastConfig(config)
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
        if (!supportResistanceData.length) return;
        supportResistanceData.map((level) => {
            seriesRef.current.createPriceLine({
                price: level.Start,
                time: convertToEpochTime(level.StartTime),
                endTime: convertToEpochTime(level.EndTime),
                color: levelMarkerColor(level.Count),
                lineWidth: 2,
                lineStyle: 0,
                axisLabelVisible: true,
                titleBorderColor: '#2962FF',
            });
        })
    }, [supportResistanceData])

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
