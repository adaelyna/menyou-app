import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import usersApi from '../api/users'
import { parseListObjectToIds } from '../helpers/parseData'

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
        if (users.value) {
            return
        }
        
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

    const addUser = async (form) => {
        buttonsLoading.add = true

        form.role_list = parseListObjectToIds(form.role_list)

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

    const updateUser = async (userId, form) => {
        buttonsLoading.edit = true
        delete form.password

        form.role_list = parseListObjectToIds(form.role_list)

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

    const deleteUser = async (userId) => {
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
