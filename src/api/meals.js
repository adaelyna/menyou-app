import axios from './axios'

const getMeals = () => {
    return axios.get('/meal/list')
}

const addMeal = (payload) => {
    return axios.post('/meal', {
        meal: payload
    })
}

export default {
    getMeals,
    addMeal
}