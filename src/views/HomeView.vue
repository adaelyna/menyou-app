<template>
    <main>
        <h1>Home page</h1>
        <RouterLink to="/users" class="link">
            Пользователи
        </RouterLink>
        <MButton :label="'Пользователи'" @click="router.push('/users')" />
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import MButton from '../components/ui/MButton.vue'

const router = useRouter()

</script>

<style scoped lang="scss">
.link {
    text-decoration: none;
    color: #bebebe;
    transition: all .5s;

    &:hover {
        color: #7c7c7c;
    }
}
</style>
