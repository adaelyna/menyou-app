import axios from './axios'

const getUsers = () => {
    return axios.get('/user/list')
}

const addUser = (payload) => {
    return axios.post('/user', {
        user: payload
    })
}

export default {
    getUsers,
    addUser
}