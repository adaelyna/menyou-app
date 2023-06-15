import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
    const user = ref(null)
    
    function setUser(payload) {
        user.value = payload
    }

    return {
        user,
        setUser
    }
})
