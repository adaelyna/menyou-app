import { defineStore } from 'pinia'
import { ref } from 'vue'

import rolesApi from '@/api/roles'

export const useRolesStore = defineStore('roles', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const roles = ref(null)

    const getRoles = () => {
        isLoading.value = true
        roles.value = null

        rolesApi
            .getRoles()
            .then(({ data }) => {
                roles.value = data.roles
                total.value = data.total
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    return {
        isLoading,
        total,
        roles,
        getRoles
    }
})
