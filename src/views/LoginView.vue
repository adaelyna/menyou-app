<template>
    <div class="login-page">
        <div class="container">
            <h1>Авторизация</h1>
            <LoginForm />
        </div>
    </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
.login-page {
    background-color: #e7e7e7;
    min-height: 100vh;
}
</style>
