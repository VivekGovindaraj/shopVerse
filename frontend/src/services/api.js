import axios from 'axios'
import { useTransition } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_API;


 const api = axios.create({
    baseURL:API_URL
})

api.interceptors.request.use(
    (config) => {
        if(config){

            const token = localStorage.getItem("token")
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default api;
