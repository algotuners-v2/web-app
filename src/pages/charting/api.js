import {api} from "../../api";
import {getTimezoneOffset} from "../../utils/time";

export const historicalData = async (token, interval, days) => {
    let startTime = new Date();
    let endTime = new Date();
    startTime.setDate(endTime.getDate() - days);
    let startTimeStr = startTime.toISOString().replace(/\.\d{3}Z/, '');
    let startTimeOffset = getTimezoneOffset(startTime);
    startTimeStr = startTimeStr + startTimeOffset
    let endTimeStr = endTime.toISOString().replace(/\.\d{3}Z/, '');
    let endTimeOffset = getTimezoneOffset(endTime);
    endTimeStr = endTimeStr + endTimeOffset;

    return (await api.get('/historical-data', {
        params: {
            exchange_token: token,
            interval_in_seconds: interval,
            start_time: startTimeStr,
            end_time: endTimeStr,
        }
    })).data;
}