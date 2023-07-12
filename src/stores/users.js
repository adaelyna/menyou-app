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

    const updateUser = (userId, form) => {
        buttonsLoading.edit = true
        delete form.password

        form.role_list.forEach((role) => {
            if (typeof role === 'object') {
                form.role_list = []
                form.role_list.push(role.id)
            }
        })

        return usersApi
            .updateUser(userId, form)
            .then(({ data }) => {
                users.value = users.value.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...data.user
                        }
                    }

                    return user
                })
            })
            .finally(() => {
                buttonsLoading.edit = false
            })
    }

    const deleteUser = (userId) => {
        buttonsLoading.delete = true

        return usersApi
            .deleteUser(userId)
            .then(() => {
                users.value = users.value.filter((user) => user.id !== userId)
            })
            .finally(() => {
                buttonsLoading.delete = false
            })
    }

    return {
        isLoading,
        total,
        users,
        buttonsLoading,
        getUsers,
        addUser,
        updateUser,
        deleteUser
    }
})
