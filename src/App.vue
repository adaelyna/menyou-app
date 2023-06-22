<template>
    <main class="wrapper">
        <MHeader v-if="isLoggedIn" />
        <div class="content">
            <RouterView />
        </div>
        <MFooter v-if="isLoggedIn" />
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import MFooter from './components/layout/MFooter.vue'
import MHeader from './components/layout/MHeader.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

onMounted(() => {
    authStore.getCurrentUser()
})
</script>

<style scoped></style>
