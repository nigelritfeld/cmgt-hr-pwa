import axios from "axios";

/**
 * CMGT API Client
 * Axios client with intercepting headers
 * plugins/axios.ts
 */
const CMGT = axios.create({
    baseURL: 'https://cmgt.hr.nl/api/',
    // timeout: 1000,
    headers: {
        'X-CLIENT': 'CMGT-HR-PWA',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

/**
 * Adding interceptors
 */
CMGT.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default CMGT
