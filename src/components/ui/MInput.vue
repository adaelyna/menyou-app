<template>
    <input :type="type" :class="['input', color]" :placeholder="placeholder">
</template>

<script setup>
defineProps({
    placeholder: { type: String, required: false, default: '' },
    color: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'text' }
})
</script>

<style scoped lang="scss">
.input {
    display: inline-block;
    width: 100%;
    color: rgb(104, 104, 104);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    border: 1px solid rgba(92, 99, 112, 0.32);
    padding: 10px;
    border-radius: 8px;

    &:focus {
        outline: 1px solid #0828fe;
    }

    &.placeholder {
        color: rgb(144, 144, 144);
    }
    &.error {
        border: 1px solid red;
    }
}
</style>