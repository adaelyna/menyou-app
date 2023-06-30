import axios from './axios'

const getProducts = () => {
    return axios.get('/product/list')
}

const addProduct = (payload) => {
    return axios.post('/product', {
        product: payload
    })
}

const editProduct = (productId, payload) => {
    return axios.put(`/product/${productId}`, {
        product: payload
    })
}

export default {
    getProducts,
    addProduct,
    editProduct
}