import axios from "axios";

// export const BASE_URL = 'http://localhost:8090';
export const BASE_URL = 'https://api.algotuners.com';
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});