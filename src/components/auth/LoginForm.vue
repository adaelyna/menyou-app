<template>
    <div class="login-form">
        <MLoader v-if="isLoading" full />
        
        <div class="form-card">
            <h2 class="login-form__title">Авторизация</h2>

            <MInput v-model="form.username" placeholder="Логин" />
            <MInput v-model="form.password" placeholder="Пароль" type="password" />
            <MButton color="primary" @click="submit">Войти</MButton>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'

import MButton from '../ui/MButton.vue'
import MInput from '../ui/Minput.vue'
import MLoader from '../ui/MLoader.vue'
import { useAuthStore } from '../../stores/auth'

const form = reactive({
    username: '',
    password: ''
})

const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)

const submit = () => {
    authStore.loginUser(form)
}
</script>

<style scoped lang="scss">
.login-form {
    &__title {
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 20px;
    }
}
.form-card {
    padding: 24px;
    max-width: 400px;
    border-radius: 12px;
    background-color: $white;

    input {
        margin-bottom: 10px;
    }
}
</style>
