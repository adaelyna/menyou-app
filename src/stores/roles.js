import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import rolesApi from '@/api/roles'

export const useRolesStore = defineStore('roles', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const roles = ref(null)
    const buttonsLoading = reactive({
        add: false
    })

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

    const addRole = (form) => {
        buttonsLoading.add = true

        rolesApi
            .addRole(form)
            .then(({ data }) => {
                roles.value = [...roles.value, data.role]
                total.value++
            })
            .finally(() => {
                buttonsLoading.add = false
            })
    }

    const deleteRole = (roleId) => {
        rolesApi
            .deleteRole(roleId)
            .then(() => {
                roles.value = roles.value.filter((role) => role.id !== roleId)
            })
    }

    return {
        isLoading,
        total,
        roles,
        buttonsLoading,
        getRoles,
        addRole,
        deleteRole
    }
})
