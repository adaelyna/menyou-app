import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import authApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    const user = ref(null)
    const isLoggedIn = ref(false)
    const isLoading = ref(false)
    const isPreLoader = ref(false)

    const loginUser = (credentials) => {
        isLoading.value = true

        authApi
            .login(credentials)
            .then(({ data }) => {
                user.value = data.user
                isLoggedIn.value = true

                localStorage.setItem('accessToken', data.user.token)

                router.push({ name: 'home' })
            })
            .catch(() => {
                isLoggedIn.value = false
                user.value = null
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const logoutUser = async () => {
        user.value = null
        isLoggedIn.value = false
        
        localStorage.removeItem('accessToken')

        router.push({ name: 'login' })
    }

    const getCurrentUser = async () => {
        if (!localStorage.getItem('accessToken')) {
            router.push({ name: 'login' })

            return
        }

        isPreLoader.value = true

        await authApi
            .getCurrentUser()
            .then(({ data }) => {
                user.value = data.user
                isLoggedIn.value = true
            })
            .catch(() => {
                isLoggedIn.value = false
                user.value = null
            })
            .finally(() => {
                isPreLoader.value = false
            })
    }

    return {
        user,
        isLoggedIn,
        isLoading,
        isPreLoader,
        loginUser,
        getCurrentUser,
        logoutUser
    }
})
