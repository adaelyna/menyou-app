import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import usersApi from '../api/users'

export const useUsersStore = defineStore('users', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const users = ref(null)
    const buttonsLoading = reactive({
        add: false,
        edit: false,
        delete: false
    })

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

    const addUser = (form) => {
        buttonsLoading.add = true

        return usersApi
            .addUser(form)
            .then(({ data }) => {
                users.value = [...users.value, data.user]
                total.value++
            })
            .finally(() => {
                buttonsLoading.add = false
            })
    }

    return {
        isLoading,
        total,
        users,
        buttonsLoading,
        getUsers,
        addUser
    }
})
