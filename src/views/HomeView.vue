<template>
    <main>
        <h1>Home page</h1>
        <RouterLink to="/users" class="link"> Пользователи </RouterLink>
        <div class="buttons">
            <MButton label="Авторизация" @click="router.push('/login')" />
            <MButton label="Открыть модальное окно" @click="openModal" />
        </div>

        <div class="buttons-group">
            <MButton label="Кнопка" size="big" />
            <MButton label="Кнопка" color="primary" />
            <MButton label="Кнопка" size="small" color="secondary" />
            <MButton label="Кнопка" color="success" />
            <MButton label="Кнопка" color="error" />
            <MButton label="Кнопка" color="warning" />
            <MButton label="Кнопка" />
            <MButton label="Кнопка" />
        </div>

        <div v-if="isOpen" class="box">
            <div class="close" @click="closeModal">x</div>
            Some content here Some content here Some content here Some content here
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import MButton from '../components/ui/MButton.vue'

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
    gap: 16px;
    padding: 20px;
    flex-wrap: wrap;
}
</style>
