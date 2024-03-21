import axios, { AxiosRequestConfig } from "axios";

const NON_AUTH_CALLS = ['/v1/users/signup/', '/v1/users/login', '/v1/users/password-reset-no-auth']
import dotenv from "dotenv";
const axiosClientBrokerAPIService = axios.create({
    baseURL: "https://broker-api.sandbox.alpaca.markets"
    // baseURL: process.env.NODE_ENV === "production" ? "https:///api-business.elphinstone.com.pk/b2c" : "https://staging-api-business.elphinstone.com.pk/b2c"
})

//check if the call composes of login or register, if not, insert the jwt here
axiosClientBrokerAPIService.interceptors.request.use((config : AxiosRequestConfig) => {
    // if (!NON_AUTH_CALLS.includes(config.url)) {
    //     config.headers.authorization = localStorage.getItem('jwt')
    // }
    //config.headers['X-App-Type'] = 'B2C'
    //config.headers['Access-Control-Request-Headers'] = "X-Correlation-ID"
    //config.headers['X-Correlation-ID'] = uuidv4().toUpperCase()
    // console.log(config)

    return config
})


export default axiosClientBrokerAPIService
