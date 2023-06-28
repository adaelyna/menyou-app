import axios from './axios'

const getRoles = () => {
    return axios.get('/role/list')
}

const addRole = (payload) => {
    return axios.post('/role', {
        role: payload
    })
}

const deleteRole = (roleId) => {
    return axios.delete(`/role/${roleId}`)
}

export default {
    getRoles,
    addRole,
    deleteRole
}