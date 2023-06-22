import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isLoggedIn = ref(false)
    
    function setUser(payload) {
        user.value = payload
    }

    function setisLoggedIn(payload) {
        isLoggedIn.value = payload
    }

    return {
        user,
        setUser,
        isLoggedIn,
        setisLoggedIn
    }
})
