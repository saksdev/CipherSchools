import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

const instance = axios.create({
    baseURL
});

if (import.meta.env.DEV) {
    console.log('API Base URL:', baseURL);
}

export default instance;
