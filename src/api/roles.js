import axios from './axios'

const getRoles = () => {
    return axios.get('/role/list')
}

const addRole = (payload) => {
    return axios.post('/role', {
        role: payload
    })
}

const updateRole = (roleId, payload) => {
    return axios.put(`/role/${roleId}`, {
        role: payload
    })
}

const deleteRole = (roleId) => {
    return axios.delete(`/role/${roleId}`)
}

export default {
    getRoles,
    addRole,
    deleteRole,
    updateRole
}