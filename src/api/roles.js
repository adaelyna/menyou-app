import axios from './axios'

const getRoles = () => {
    return axios.get('/role/list')
}

const addRole = (payload) => {
    return axios.post('/role', {
        role: payload
    })
}

export default {
    getRoles,
    addRole
}