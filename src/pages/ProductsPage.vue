<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Продукты</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>

            <MLoader v-if="productsStore.isLoading" />

            <div v-if="productsStore.products" class="products-list">
                <MProductCard
                    v-for="product of productsStore.products"
                    :key="product.name"
                    :product="product"
                >
                    <template #actions>
                        <MButton color="transparent" @click="handleEdit(product)">
                            <img src="@/assets/images/edit-icon-color.svg" alt="Редактировать" />
                        </MButton>
                        <MButton color="transparent" @click="handleDelete(product)">
                            <img src="@/assets/images/delete-icon-color.svg" alt="Удалить" />
                        </MButton>
                    </template>
                </MProductCard>
            </div>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MInput v-model="form.description" placeholder="Описание" />
                    <MInput v-model="form.image" placeholder="Вставьте URL картинки" />
                    <MButton color="primary" :loading="buttonsLoading['add']" @click="submitAdd">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="form.name" placeholder="Имя" />
                    <MInput v-model="form.description" placeholder="Описание" />
                    <MInput v-model="form.image" placeholder="Вставьте URL картинки" />
                    <MToggle v-model="form.in_stock" label="В наличии" />
                    <MButton color="primary" :loading="buttonsLoading['edit']" @click="submitEdit">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.delete">
                <div class="modal-content">
                    <h4>Вы действительно хотите удалить?</h4>
                    <MButton
                        color="primary"
                        full
                        :loading="buttonsLoading.delete"
                        @click="submitDelete"
                    >
                        Да
                    </MButton>
                    <MButton full @click="toggleModal('delete')"> Нет </MButton>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useProductsStore } from '../stores/products'
import MButton from '@/components/ui/MButton.vue'
import MProductCard from '../components/ui/MProductCard.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MModal from '@/components/ui/MModal.vue'
import MInput from '@/components/ui/MInput.vue'
import MToggle from '@/components/ui/MToggle.vue'

const productsStore = useProductsStore()
const { buttonsLoading } = storeToRefs(productsStore)

const modalState = reactive({
    add: false,
    edit: false,
    delete: false
})

const selectedProduct = ref(null)

const form = reactive({
    name: '',
    description: '',
    image: '',
    in_stock: true
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    productsStore.addProduct(form).then(() => {
        toggleModal('add')
    })
}

const submitEdit = () => {
    productsStore.updateProduct(selectedProduct.value.id, form).then(() => {
        toggleModal('edit')
    })
}

const submitDelete = () => {
    productsStore.deleteProduct(selectedProduct.value.id).then(() => {
        toggleModal('delete')
    })
}

const handleAdd = () => {
    form.name = ''
    form.description = ''
    form.image = ''

    toggleModal('add')
}

const handleEdit = (product) => {
    form.name = product.name
    form.description = product.description
    form.image = product.image
    form.in_stock = product.in_stock

    selectedProduct.value = product

    toggleModal('edit')
}

const handleDelete = (product) => {
    selectedProduct.value = product

    toggleModal('delete')
}

onMounted(() => {
    productsStore.getProducts()
})
</script>

<style scoped lang="scss">
.page {
    background-color: $light-gray;
}

.products-list {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 20px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
