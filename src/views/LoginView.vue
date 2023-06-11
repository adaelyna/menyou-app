<template>
    <div class="login-page">
        <div class="container">
            <h1>Авторизация</h1>
            <LoginForm />
            <MButton :label="'Открыть модальное окно'" @click="openModal" />
            <div v-if="isOpen" class="box">
                <div class="close" @click="closeModal">x</div>
                Some content here
                Some content here
                Some content here
                Some content here
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import LoginForm from '../components/LoginForm.vue'
import MButton from '../components/ui/MButton.vue';

const isOpen = ref(false)

const openModal = () => {
     isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}
</script>

<style scoped lang="scss">
.login-page {
    background-color: #e7e7e7;
    min-height: 100vh;
}

.box {
    position: relative;
    background-color: white;
    padding: 24px;
    border-radius: 16px;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 24px;
}

.close {
    font-size: 18px;
    position: absolute;
    top: 6px;
    right: 6px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;

    &:hover {
        transform: rotate(90deg);
    }
}
</style>
