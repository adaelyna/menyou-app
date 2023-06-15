<template>
    <div class="login-form">
        <MLoader v-if="isLoading" full />
        <div class="form-card">
            <h2 class="login-form__title" >Авторизация</h2>
            <MInput v-model="form.username" placeholder="Логин" />
            <MInput v-model="form.password" placeholder="Пароль" type="password" />  
            <MButton label="Войти" color="primary" @click="submit" />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import MButton from './ui/MButton.vue'
import MInput from './ui/Minput.vue'
import MLoader from './ui/MLoader.vue'
import authApi from '../api/auth'

const router = useRouter()

const isLoading = ref(false)

const form = reactive({
    username: '',
    password: ''
})

const submit = () => {
    console.log('submit');
    isLoading.value = true
    authApi.login({
        ...form
    })
    .then(({ data }) => {
        console.log('data', data)
        router.push({
            name: 'home'
        })
    })
    .catch((e) => {
        console.log('error', e);
    })
    .finally(() => {
        isLoading.value = false
    })
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
    background-color: #fff;

    input {
        margin-bottom: 10px;
    }
}
</style>
