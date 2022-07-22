import axios from 'axios'

const api = axios.create({
    baseURL: "http://192.168.100.12:8080"
    // baseURL: "http://10.0.2.2:2222"
})
export default api