import axios, { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store"

const axiosClient = axios.create({
    baseURL: "https://api.elphinstone.us/v1/referral-service"
    // baseURL: process.env.NODE_ENV === "production" ? "https:///api-business.elphinstone.com.pk/b2c" : "https://staging-api-business.elphinstone.com.pk/b2c"
})

//check if the call composes of login or register, if not, insert the jwt here
axiosClient.interceptors.request.use(async (config : AxiosRequestConfig) => {
    
    const sessionToken = JSON.parse(await SecureStore.getItemAsync("user_session") as string )
    config.headers['X-Session-Token'] = sessionToken.session_token
    config.auth
    return config
})


export default axiosClient
