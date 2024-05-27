import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})


axiosClient.interceptors.response.use((response) => {
    return response.data
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error)
})

export default axiosClient