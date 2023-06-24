import axios from 'axios'

axios.defaults.baseURL = 'https://menyou.adaptable.app'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    const authorizationToken = token ? `Token ${token}` : ''

    config.headers.Authorization = authorizationToken

    return config
})

export default axios