<template>
    <div class="home-page">
        <div class="container">
            <div class="buttons">
                <MButton @click="router.push('/login')">Авторизация</MButton>
                <MButton @click="openModal">Открыть модальное окно</MButton>
            </div>

            <div class="buttons-group">
                <MButton size="big" />
                <MButton color="primary" />
                <MButton size="small" color="secondary" />
                <MButton color="success" />
                <MButton color="error" />
                <MButton color="warning" />
                <MButton />
                <MButton />
            </div>

            <div v-if="isOpen" class="box">
                <div class="close" @click="closeModal">x</div>
                Some content here Some content here Some content here Some content here
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import MButton from '../components/ui/MButton.vue'
import { useAuth } from '../stores/auth'

const { user } = useAuth()

const isOpen = ref(false)

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const router = useRouter()
</script>

<style scoped lang="scss">
.home-page {
    padding: 30px;
}
.link {
    text-decoration: none;
    color: #bebebe;
    transition: all 0.5s;

    &:hover {
        color: #7c7c7c;
    }
}

.box {
    position: relative;
    background-color: rgb(235, 235, 235);
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
    transition: all 0.3s;

    &:hover {
        transform: rotate(90deg);
    }
}

.buttons {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 10px;
}

.buttons-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 20px;
}
</style>
