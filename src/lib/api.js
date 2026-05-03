// src/lib/api.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor — add auth token + language automatically
api.interceptors.request.use((config) => {
    const token = document.cookie.match(/portal_logistics_token=([^;]+)/)?.[1];
    const lang = localStorage.getItem('i18nextLng') || 'ar';

    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers['X-LANG'] = lang;

    return config;
});

// Response interceptor — handle 401 globally
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            // Clear auth cookies
            document.cookie = 'portal_logistics_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/';
        }
        return Promise.reject(err);
    }
);

export default api;