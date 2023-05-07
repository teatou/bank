import axios from 'axios'

export const API_URL = import.meta.env.VITE_SERVER

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


export default $api
