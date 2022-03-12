import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL_ENDPOINT = "http://localhost:8080"
const axiosClient = axios.create({
    baseURL: BASE_URL_ENDPOINT,
    headers: {
        'Content-Type': 'application/json'
    }
})

//Request Interceptors
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
}, (error) => {
    return Promise.reject(error.response.data)
})

//Response Interceptor
axiosClient.interceptors.response.use((response: AxiosResponse) => {
    console.log(response)
    console.log(response.data)
    return response.data
}, (error) => {
    return Promise.reject(error.response.data)
})

export default axiosClient