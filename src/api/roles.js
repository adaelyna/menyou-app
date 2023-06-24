import axios from './axios'

const getRoles = () => {
    return axios.get('/role/list')
}

export default {
    getRoles
}