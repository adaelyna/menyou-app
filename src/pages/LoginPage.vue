<template>
    <div class="login-page">
        <div class="container">
            <LoginForm />
        </div>
    </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped lang="scss">
.login-page {
    background-color: #e7e7e7;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
