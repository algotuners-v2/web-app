import {api} from "../../api";
import {getTimezoneOffset} from "../../utils/time";

export const historicalData = async (token, time_frame, days, endTime) => {
    // let startTime = new Date(endTime.getTime()); // Clone endTime to avoid mutation
    // startTime.setDate(startTime.getDate() - days); // Subtract days to get startTime
    // let startTimeStr = startTime.toISOString().replace(/\.\d{3}Z$/, '');
    // let startTimeOffset = getTimezoneOffset(startTime);
    // startTimeStr = startTimeStr + startTimeOffset;
    // let endTimeStr = endTime.toISOString().replace(/\.\d{3}Z$/, '');
    // let endTimeOffset = getTimezoneOffset(endTime);
    // endTimeStr = endTimeStr + endTimeOffset;
    //
    // if (new Date(startTimeStr) > new Date(endTimeStr)) {
    //     console.error('startTime is greater than endTime, adjusting...');
    //     return []
    // }
    //
    // return (await api.get('/historical-data', {
    //     params: {
    //         exchange_token: token,
    //         interval_in_seconds: intervalInSeconds,
    //         start_time: startTimeStr,
    //         end_time: endTimeStr,
    //     }
    // })).data;
};

export const todayOhlcData = async (token, time_frame) => {
    return (await api.get('/current-day-ohlc', {
        params: {
            exchange_token: token,
            time_frame: time_frame,
        }
    })).data;
};

export const getSupportResistanceData = async (candles) => {
    const config = {
        url: '/important-levels',
        method: 'POST',
        data: {
            "candles_data": candles
        }
    };
    return (await api.request(config)).data;
};