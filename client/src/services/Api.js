import axios from 'axios'
import store from '../store'

export default () => {
    const axiosInstance = axios.create({
        baseURL:'http://localhost:8081'
    })

    const requestHandler = (request) => {
        const token = store.state.auth.token
        request.headers['Authorization'] = `Bearer ${token}`
        return request
    }

    axiosInstance.interceptors.request.use(
        request => requestHandler(request)
    )

    const errorHandler = (error) => {
        return Promise.reject({ ...error })
    }
      
    const successHandler = (response) => {
        return response
    }

    axiosInstance.interceptors.response.use(
        response => successHandler(response),
        error => errorHandler(error)
    )

    return axiosInstance
}