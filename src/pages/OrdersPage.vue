<template>
    <h1>Orders page</h1>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrdersStore } from '../stores/order'

const ordersStore = useOrdersStore()

onMounted(() => {
    ordersStore.getOrders()
})

</script>

<style scoped lang="scss">
</style>