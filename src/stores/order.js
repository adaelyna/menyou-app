import { defineStore } from 'pinia'
import { ref } from 'vue'

import ordersApi from '@/api/orders'

export const useOrdersStore = defineStore('orders', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const orders = ref(null)

    const getOrders = () => {
        if (orders.value) {
            return
        }

        isLoading.value = true
        orders.value = null

        ordersApi
            .getOrderList()
            .then(({ data }) => {
                orders.value = data.orders
                total.value = data.total
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    return {
        isLoading,
        total,
        orders,
        getOrders
    }
})
