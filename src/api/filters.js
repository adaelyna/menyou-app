import axios from './axios'

const getFilters = () => {
    return axios.get('/filter/list')
}

const addFilter = (payload) => {
    return axios.post('/filter', {
        filter: payload
    })
}

const editFilter = (filterId, payload) => {
    return axios.put(`/filter/${filterId}`,{
        filter: payload
    })
}

const deleteFilter = (filterId) => {
    return axios.delete(`/filter/${filterId}`)
}

export default {
    getFilters,
    addFilter,
    editFilter,
    deleteFilter
}