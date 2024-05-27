import axiosClient from "./axios-client";
import { Endpoints } from "./request.type";


export const requestActions = {
    GET_API: (endpoint: Endpoints) => {
        return new Promise((resolve, reject) => {
            const respones = axiosClient.get(endpoint)
            respones.then((res: any) => {
                if (res.status === 200 || res.status === 201) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch((err: any) => {
                reject(err)
            })
        })
    },

    POST_API: (endpoint: Endpoints, data: any) => {
        return new Promise((resolve, reject) => {
            const respones = axiosClient.post(endpoint, data)
            respones.then((res: any) => {
                if (res.status === 200 || res.status === 201) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch((err: any) => {
                reject(err)
            })
        })
    },

    PUT_API: (endpoint: Endpoints, data?: any) => {
        return new Promise((resolve, reject) => {
            const respones = axiosClient.put(endpoint, data)
            respones.then((res: any) => {
                if (res.status === 200 || res.status === 201) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch((err: any) => {
                reject(err)
            })
        })
    },

    DELETE_API: (endpoint: Endpoints) => {
        return new Promise((resolve, reject) => {
            const respones = axiosClient.delete(endpoint)
            respones.then((res: any) => {
                if (res.status === 200 || res.status === 201) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}