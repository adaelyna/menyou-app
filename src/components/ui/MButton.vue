<template>
    <button class="btn primary">{{ label }}</button>
</template>

<script setup>
defineProps({
    label: { type: String, required: false, default: 'Submit' }
})
</script>

<style lang="scss">
.btn {
    display: block;
    border: 0;
    outline: 0;
    border-radius: 8px;
    padding: 10px 30px;
    font-size: 14px;
    line-height: 14px;
    transition: all .6s;
    cursor: pointer;

    &:hover {
        background-color: #a3a3a3;
    }

    &.primary {
        background-color: #0828fe;
        color: #fff;

        &:hover {
            background-color: #0520d2;
        }
    }
}
</style>