import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BACKEND_URL
})

axiosInstance.interceptors.request.use(
    function (config) {
        const token = cookie.get("token")
        if (token && config) {
            if (!config.headers) {
                config.headers = {}
            }
            (config.headers as Record<string, unknown>)["access-token"] = token
        }

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default axiosInstance