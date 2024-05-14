export const pingWsRequest = {
    "messageType": "ping",
    "message": ""
}

export const pongWsResponse = {
    "messageType": "ping",
    "message": "pong"
}


export const intradayScreenersWsRequest = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "day_range_breakout_screener_id": "",
            "velocity_stock_screener_id": "",
            "candle_reversal_screener_id": [
                {
                    "timeframe": "five_minutes"
                },
                {
                    "timeframe": "fifteen_minutes"
                },
            ]
        }
    }
}

export const swingTradingScreenersWsRequest = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "candle_reversal_screener_id": [
                {
                    "timeframe": "fifteen_minutes"
                },
                {
                    "timeframe": "hour"
                },
                {
                    "timeframe": "day"
                },
            ]
        }
    }
}

export const dayRangeBreakoutScreenerWsRequest = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "day_range_breakout_screener_id": ""
        }
    }
}

export const marketInfoScreenerWsRequest = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "market_stats_info_screener": ""
        }
    }
}

export const velocityStocksScreenerWsRequest = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "velocity_stock_screener_id": ""
        }
    }
}
export const candleReversalScreenerWsRequest15min = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "candle_reversal_screener_id": [
                {
                    "timeframe": "fifteen_minutes"
                }
            ]
        }
    }
}

export const candleReversalScreenerWsRequest5min = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "candle_reversal_screener_id": [
                {
                    "timeframe": "five_minutes"
                }
            ]
        }
    }
}

export const candleReversalScreenerWsRequest60min = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "candle_reversal_screener_id": [
                {
                    "timeframe": "hour"
                }
            ]
        }
    }
}

export const candleReversalScreenerWsRequest1Day = {
    "messageType": "subscribeScreeners",
    "message": {
        "screenerConfigMap": {
            "candle_reversal_screener_id": [
                {
                    "timeframe": "day"
                }
            ]
        }
    }
}
