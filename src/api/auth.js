import axios from './axios'

const login = (credentials) => {
    return axios.post('/user/login', {
        user: credentials
    })
}

const getCurrentUser = () => {
    return axios.get('/user')
}

export default {
    login,
    getCurrentUser
}