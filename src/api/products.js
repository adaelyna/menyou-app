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

const deleteProduct = (productId) => {
    return axios.delete(`/product/${productId}`)
}

export default {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct
}