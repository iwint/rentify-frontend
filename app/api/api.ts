import { trackPromise } from "react-promise-tracker"
import { Routes } from "./request.type"
import axios from "axios"
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
const token = localStorage.getItem('token')

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": '*',
    'Accept': 'application/json',
    Authorization: `Bearer ${token}`
}

console.log(token);


export const GET_API = (endpoint: Routes) => {
    return trackPromise(new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/${endpoint}`, {
            headers: headers
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}

export const POST_API = async (endpoint: string, data: any) => {
    return trackPromise(new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}

export const PUT_API = (endpoint: Routes, data: any) => {
    return trackPromise(new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/${endpoint}`, data, {
            headers: headers
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}

export const DELETE_API = (endpoint: Routes) => {
    return trackPromise(new Promise((resolve, reject) => {
        axios.delete(`${BASE_URL}/${endpoint}`, {
            headers: headers
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}