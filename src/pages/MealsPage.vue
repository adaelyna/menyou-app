<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Блюда</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>

            <MLoader v-if="mealsStore.isLoading" />

            <div v-if="mealsStore.meals" class="meals-list">
                <MMealCard v-for="meal of mealsStore.meals" :key="meal.name" :meal="meal">
                    <template #actions>
                        <MButton color="transparent">
                            <img src="@/assets/images/edit-icon-color.svg" alt="Редактировать" />
                        </MButton>
                        <MButton color="transparent">
                            <img src="@/assets/images/delete-icon-color.svg" alt="Удалить" />
                        </MButton>
                    </template>
                </MMealCard>
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
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'

import { useMealsStore } from '../stores/meals'

import MButton from '@/components/ui/MButton.vue'
import MMealCard from '../components/ui/MMealCard.vue'
import MLoader from '../components/ui/MLoader.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '@/components/ui/MModal.vue'

const mealsStore = useMealsStore()
const { buttonsLoading } = storeToRefs(mealsStore)

const modalState = reactive({
    add: false,
    edit: false,
    delete: false
})

const form = reactive({
    name: '',
    description: '',
    image: '',
    product_list: [],
    filter_list: []
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    mealsStore.addMeal(form).then(() => {
        toggleModal('add')
    })
}

const handleAdd = () => {
    form.name = ''
    form.description = ''
    form.image = ''

    toggleModal('add')
}

onMounted(() => {
    mealsStore.getMeals()
})
</script>

<style scoped lang="scss">
.page {
    background-color: $gray-light;
}

.meals-list {
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
