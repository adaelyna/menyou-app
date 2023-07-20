import axios from './axios'

const getMeals = () => {
    return axios.get('/meal/list')
}

const addMeal = (payload) => {
    return axios.post('/meal', {
        meal: payload
    })
}

const editMeal = (mealId, payload) => {
    return axios.put(`/meal/${mealId}`, {
        meal: payload
    })
}

export default {
    getMeals,
    addMeal,
    editMeal
}