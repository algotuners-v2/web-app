import axios from "axios";

// export const BASE_URL = 'http://localhost:8090';
// export const WS_BASE_URL = 'localhost:8090';
// export const BASE_URL = 'https://api.algotuners.com';
// export const WS_BASE_URL = 'api.algotuners.com/ws/screeners';
// export const BASE_URL = 'https://api-aws.algotuners.com';
// export const WS_BASE_URL = 'api-aws.algotuners.com/ws/screeners';
// export const WS_BASE_URL = 'gomarketwatch-production.up.railway.app/ws/screeners';
// export const BASE_URL = 'https://gomarketwatch-production.up.railway.app/';
export const WS_BASE_URL = 'go-market-watch.onrender.com/ws/screeners';
export const BASE_URL = 'https://go-market-watch.onrender.com';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});