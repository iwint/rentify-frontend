import { trackPromise } from "react-promise-tracker"
import { request } from "./request"
import { Routes } from "./request.type"

export const GET_API = (endpoint: Routes) => {
    return trackPromise(new Promise((resolve, reject) => {
        const response = request.get(endpoint).then(res => {
            if (res.status === 201 || res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}

export const POST_API = (endpoint: string, data: any) => {
    return trackPromise(new Promise((resolve, reject) => {
        const response = request.post(endpoint, data).then(res => {
            if (res.status === 201 || res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}

export const PUT_API = (endpoint: Routes, data: any) => {
    return trackPromise(new Promise((resolve, reject) => {
        const response = request.post(endpoint, data).then(res => {
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
        const response = request.delete(endpoint).then(res => {
            if (res.status === 201 || res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => reject(err))
    }))
}