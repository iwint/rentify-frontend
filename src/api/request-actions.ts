

import { trackPromise } from "react-promise-tracker"
import { Endpoints } from "./request.type"
import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`

export const requestActions = {
    GET_API: async (endpoint: Endpoints) => {
        const token = await localStorage.getItem('token')
        return trackPromise(new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": '*',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 201 || res.status === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch(err => reject(err))
        }))
    },
    POST_API: async (endpoint: string, data: any) => {
        const token = await localStorage.getItem('token')
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
    },
    PUT_API: async (endpoint: Endpoints, data?: any) => {
        const token = await localStorage.getItem('token')
        return trackPromise(new Promise((resolve, reject) => {
            axios.put(`${BASE_URL}/${endpoint}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": '*',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 201 || res.status === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch(err => reject(err))
        }))
    },

    DELETE_API: async (endpoint: Endpoints) => {
        const token = await localStorage.getItem('token')
        return trackPromise(new Promise((resolve, reject) => {
            axios.delete(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": '*',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 201 || res.status === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(err => reject(err))
        }))
    }

}
