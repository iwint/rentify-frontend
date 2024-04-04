import axios from "axios"
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
export const request = axios.create()
let headers: any = {}
request.defaults.baseURL = BASE_URL
const token = localStorage.getItem('token')
headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}
if (token != null) {
    headers['Authorization'] = `Bearer ${token}`
}
request.defaults.headers = headers
request.defaults.withCredentials = true