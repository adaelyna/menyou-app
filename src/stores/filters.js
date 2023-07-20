import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

import filtersApi from '../api/filters'

export const useFiltersStore = defineStore('filters', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const filters = ref(null)
    const buttonsLoading = reactive({
        add: false,
        edit: false,
        delete: false
    })

    const getFilters = () => {
        isLoading.value = true
        filters.value = null

        filtersApi
            .getFilters()
            .then(({ data }) => {
                filters.value = data.filters
                total.value = data.total
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const addFilter = (form) => {
        buttonsLoading.add = true

        return filtersApi
        .addFilter(form)
        .then(({ data }) => {
            filters.value = [...filters.value, data.filter]
            total.value++
        })
        .finally(() => {
            buttonsLoading.add = false
        })
    }

    const updateFilter = (filterId, form) => {
        buttonsLoading.edit = true

        return filtersApi
            .editFilter(filterId, form)
            .then(({ data }) => {
                filters.value = filters.value.map((filter) => {
                    if (filter.id === filterId) {
                        return {
                            ...filter,
                            name: data.filter.name
                        }
                    }
                    return filter
                })
            })
            .finally(() => {
                buttonsLoading.edit = false
            })
    }

    const deleteFilter = (filterId) => {
        buttonsLoading.delete = true

        return filtersApi
        .deleteFilter(filterId)
        .then(() => {
            filters.value = filters.value.filter((filter) => filter.id != filterId)
        })
        .finally(() => {
            buttonsLoading.delete = false
        })
    }

    return {
        isLoading,
        total,
        filters,
        buttonsLoading,
        getFilters,
        addFilter,
        updateFilter,
        deleteFilter
    }
})
