import axios from './axios'

const login = (credentials) => {
    return axios.post('/user/login', {
        user: credentials
    })
}

export default {
    login
}