<template>
    <button :class="['btn', size, color, full ? 'full' : '']">
        <span v-if="loading">Loading...</span>
        <slot>Submit</slot>
    </button>
</template>

<script setup>
defineProps({
    full: { type: Boolean, required: false, default: false },
    color: { type: String, required: false, default: '' },
    size: { type: String, required: false, default: 'medium' },
    loading: { type: Boolean, required: false, default: false }
})
</script>

<style scoped lang="scss">
.btn {
    display: block;
    border: 0;
    border-radius: 8px;
    padding: 11px 30px;
    font-size: 16px;
    line-height: 16px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        background-color: #a3a3a3;
    }

    &.big {
        padding: 16px 40px;
        font-size: 18px;
        line-height: 18px;
    }

    &.small {
        padding: 8px 20px;
        font-size: 12px;
        line-height: 12px;
    }

    &.primary {
        background-color: #0828fe;
        color: #fff;

        &:hover {
            background-color: #0520d2;
        }
    }

    &.secondary {
        background-color: #3b48a1;
        color: #fff;

        &:hover {
            background-color: #2a3684;
        }
    }

    &.success {
        background-color: green;
        color: #fff;

        &:hover {
            background-color: rgb(1, 84, 1);
        }
    }

    &.error {
        background-color: red;
        color: #fff;

        &:hover {
            background-color: tomato;
        }
    }

    &.warning {
        background-color: orange;
        color: #fff;

        &:hover {
            background-color: rgb(181, 117, 0);
        }
    }

    &.transparent {
        color: #fff;
        background-color: transparent;
        padding: 0;
        border-radius: 0;
    }

    &.full {
        width: 100%;
    }
}
</style>