import axios from "axios";
import { getToken } from "./AuthService"; 

const BASE_REST_API_URL = 'http://localhost:8080/api/user/performanceReview';

axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Đảm bảo export chính xác hàm getUserPerformanceReview
export const getUserPerformanceReview = () => axios.get(BASE_REST_API_URL);
