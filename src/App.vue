<template>
    <main class="wrapper">
        <MHeader />
        <div class="content">
            <RouterView />
        </div>
        <MFooter />
    </main>
</template>

<script setup>
import MFooter from './components/layout/MFooter.vue'
import MHeader from './components/layout/MHeader.vue'
</script>

<style scoped></style>
