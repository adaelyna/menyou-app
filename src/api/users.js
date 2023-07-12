import axios from './axios'

const getUsers = () => {
    return axios.get('/user/list')
}

const addUser = (payload) => {
    return axios.post('/user', {
        user: payload
    })
}

const updateUser = (userId, payload) => {
    return axios.put(`/user/${userId}`, {
        user: payload
    })
}

const deleteUser = (userId) => {
    return axios.delete(`/user/${userId}`)
}

export default {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}