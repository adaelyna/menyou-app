import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import authApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    const user = ref(null)
    const isLoggedIn = ref(false)
    const isLoading = ref(false)

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

    const getCurrentUser = () => {
        isLoading.value = true

        authApi
            .getCurrentUser()
            .then(({ data }) => {
                console.log('data', data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                isLoading.value = false
            })
    }
    return {
        user,
        isLoggedIn,
        isLoading,
        loginUser,
        getCurrentUser
    }
})
