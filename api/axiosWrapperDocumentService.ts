import axios, { AxiosRequestConfig } from "axios";
import * as SecureStore from 'expo-secure-store'

const axiosClient = axios.create({
    baseURL: "https://api.elphinstone.us/v1/monthly-reports/" //Change to actual port on deployment
})

axiosClient.interceptors.request.use(async (config : AxiosRequestConfig) => {
    
    const sessionToken = JSON.parse(await SecureStore.getItemAsync("user_session") as string )
    config.headers['X-Session-Token'] = sessionToken.session_token
    config.auth
    return config
})


export default axiosClient
