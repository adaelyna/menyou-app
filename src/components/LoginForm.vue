<template>
    <div class="login-form">
        <div class="form-card">
            <MInput placeholder="Логин"/>
            <MInput placeholder="Пароль" type="password"/>  
            <MButton label="Войти" color="primary" />
        </div>
    </div>
</template>

<script setup>
import MButton from './ui/MButton.vue'
import MInput from './ui/Minput.vue'
</script>

<style scoped lang="scss">
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

    input {
        margin-bottom: 10px;
    }
}
</style>
