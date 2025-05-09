// lib/axios.js
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://elsoft-testcase-backend.test/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
})

// Interceptor untuk menambahkan token setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default api
