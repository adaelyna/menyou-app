import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import mealsApi from '../api/meals'

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

    const addMeal = (form) => {
        buttonsLoading.add = true
        const parsedProductList = []
        const parsedFilterList = []

        form.product_list.forEach((product) => {
            if (typeof product === 'object') {
                parsedProductList.push(product.id)
            }
        })
        
        form.filter_list.forEach((filter) => {
            if (typeof filter === 'object') {
                parsedFilterList.push(filter.id)
            }
        })
        
        form.filter_list = [...parsedFilterList]
        form.product_list = [...parsedProductList]

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

    return {
        isLoading,
        buttonsLoading,
        total,
        meals,
        getMeals,
        addMeal
    }
})
