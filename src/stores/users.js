import { defineStore } from 'pinia'
import { ref } from 'vue'

import usersApi from '../api/users'

export const useUsersStore = defineStore('users', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const users = ref(null)

    const getUsers = () => {
        isLoading.value = true
        users.value = null

        usersApi
            .getUsers()
            .then(({ data }) => {
                users.value = data.users
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
        users,
        getUsers
    }
})
