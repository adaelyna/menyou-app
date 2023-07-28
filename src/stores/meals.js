import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import mealsApi from '../api/meals'
import { parseListObjectToIds } from '../helpers/parseData'

export const useMealsStore = defineStore('meals', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const meals = ref(null)
    const buttonsLoading = reactive({
        add: false,
        edit: false,
        delete: false
    })

    const getMeals = () => {
        if (meals.value) {
            return
        }

        isLoading.value = true
        meals.value = null

        mealsApi
            .getMeals()
            .then(({ data }) => {
                meals.value = data.meals
                total.value = data.total
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const addMeal = async (form) => {
        buttonsLoading.add = true

        form.filter_list = parseListObjectToIds(form.filter_list)
        form.product_list = parseListObjectToIds(form.product_list)

        return mealsApi
            .addMeal(form)
            .then(({ data }) => {
                meals.value = [...meals.value, data.meal]
                total.value++
            })
            .finally(() => {
                buttonsLoading.add = false
            })
    }

    const updateMeal = async (mealId, form) => {
        buttonsLoading.edit = true

        form.filter_list = parseListObjectToIds(form.filter_list)
        form.product_list = parseListObjectToIds(form.product_list)

        return mealsApi
            .editMeal(mealId, form)
            .then(({ data }) => {
                meals.value = meals.value.map((meal) => {
                    if (meal.id === mealId) {
                        return {
                            ...data.meal
                        }
                    }

                    return meal
                })
            })
            .finally(() => {
                buttonsLoading.edit = false
            })
    }

    const deleteMeal = async (mealId) => {
        buttonsLoading.delete = true

        return mealsApi
            .deleteMeal(mealId)
            .then(() => {
                meals.value = meals.value.filter((meal) => meal.id !== mealId)
            })
            .finally(() => {
                buttonsLoading.delete = false
            })
    }


    return {
        isLoading,
        buttonsLoading,
        total,
        meals,
        getMeals,
        addMeal,
        updateMeal,
        deleteMeal
    }
})
