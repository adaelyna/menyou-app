<template>
    <div class="login-form">
        <div class="form-card">
            <input type="text" placeholder="Логин" />
            <input type="password" placeholder="Пароль" />
            <MButton label="Войти" color="primary" full />
            <MInput placeholder="Логин"/>
            <MInput placeholder="Пароль"/>
        </div>
    </div>
</template>

<script setup>
import MButton from './ui/MButton.vue'
import MInput from './ui/Minput.vue'
</script>

<style scoped>
.login-form {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-card {
    padding: 24px;
    max-width: 400px;
    border-radius: 16px;
    background-color: #fff;
}
</style>
