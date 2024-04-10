import axios from "axios";

// export const BASE_URL = 'http://localhost:8090';
// export const WS_BASE_URL = 'localhost:8090';
export const BASE_URL = 'https://api.algotuners.com';
export const WS_BASE_URL = 'api.algotuners.com/ws/screeners';
// export const BASE_URL = 'https://portfolio-manager-production.up.railway.app';
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});