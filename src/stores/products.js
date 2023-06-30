import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import productsApi from '../api/products'

export const useProductsStore = defineStore('products', () => {
    const isLoading = ref(false)
    const total = ref(0)
    const products = ref(null)
    const buttonsLoading = reactive({
        add: false
    })

    const getProducts = () => {
        isLoading.value = true
        products.value = null

        productsApi
            .getProducts()
            .then(({ data }) => {
                products.value = data.products
                total.value = data.total
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const addProduct = (form) => {
        buttonsLoading.add = true

        return productsApi
            .addProduct(form)
            .then(({ data }) => {
                products.value = [...products.value, data.product]
                total.value++
            })
            .finally(() => {
                buttonsLoading.add = false
            })
    }

    const updateProduct = (productId, form) => {
        buttonsLoading.edit = true

        return productsApi
            .editProduct(productId, form)
            .then(({ data }) => {
                products.value = products.value.map((product) => {
                    if (product.id === productId) {
                        return {
                            ...product,
                            name: data.product.name,
                            description: data.product.description,
                            image: data.product.image,
                            in_stock: data.product.in_stock
                        }
                    }

                    return product
                })
            })
            .finally(() => {
                buttonsLoading.edit = false
            })
    }

    return {
        isLoading,
        total,
        products,
        buttonsLoading,
        getProducts,
        addProduct,
        updateProduct
    }
})
