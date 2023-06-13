<template>
    <input type="text" :class="['input', placeholder]">
</template>

<script setup>
defineProps({
    placeholder: { type: String, required: false, default: 'введите данные' }
})
</script>

<style scoped>
.input {
    border-radius: 0;
    color: black;
}   
input.placeholder {
        color: dimgrey;
    }
</style>