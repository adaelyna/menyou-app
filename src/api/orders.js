import axios from './axios'

const getOrderList = () => {
    return axios.get('/order/list')
}

export default {
    getOrderList
}