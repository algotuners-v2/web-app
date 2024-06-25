import axios from "axios";

// export const BASE_URL = 'http://localhost:8090';
// export const WS_BASE_URL = 'localhost:8090/ws/screeners';
// export const BASE_URL = 'https://api.algotuners.com';
// export const WS_BASE_URL = 'api.algotuners.com/ws/screeners';
// export const BASE_URL = 'https://api-gcp.algotuners.com';
// export const WS_BASE_URL = 'api-gcp.algotuners.com/ws/screeners';
// export const WS_BASE_URL = 'gomarketwatch-production.up.railway.app/ws/screeners';
// export const BASE_URL = 'https://gomarketwatch-production.up.railway.app/';
// export const WS_BASE_URL = 'market-watch.onrender.com/ws/screeners';
// export const BASE_URL = 'https://market-watch.onrender.com';
export const WS_BASE_URL = '10.190.0.5:8090/ws/screeners';
export const BASE_URL = '10.190.0.5:8090';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});