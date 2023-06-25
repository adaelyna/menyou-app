import axios from './axios'

const getUsers = () => {
    return axios.get('/user/list')
}

export default {
    getUsers
}