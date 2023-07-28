<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Блюда</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>

            <MLoader v-if="mealsStore.isLoading" />

            <div v-if="mealsStore.meals" class="meals-list">
                <MMealCard v-for="meal of mealsStore.meals" :key="meal.id" :meal="meal">
                    <template #actions>
                        <MButton color="transparent">
                            <img
                                src="@/assets/images/edit-icon-color.svg"
                                alt="Редактировать"
                                @click="handleEdit(meal)"
                            />
                        </MButton>
                        <MButton color="transparent">
                            <img
                                src="@/assets/images/delete-icon-color.svg"
                                alt="Удалить"
                                @click="handleDelete(meal)"
                            />
                        </MButton>
                    </template>
                </MMealCard>
            </div>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MInput v-model="form.description" placeholder="Описание" />
                    <MInput v-model="form.image" placeholder="Вставьте URL картинки" />
                    <MMultiSelect
                        v-model="form.product_list"
                        :items="productsStore.products"
                        placeholder="Выберите продукты"
                    />

                    <MMultiSelect
                        v-model="form.filter_list"
                        :items="filterStore.filters"
                        placeholder="Выберите фильтры"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить фильтры</p>
                        <MButton color="success" size="small" @click="handleAddFilter">+</MButton>
                    </div>
                    <MButton color="primary" :loading="buttonsLoading['add']" @click="submitAdd">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MInput v-model="form.description" placeholder="Описание" />
                    <MInput v-model="form.image" placeholder="Вставьте URL картинки" />
                    <MMultiSelect
                        v-model="form.product_list"
                        :items="productsStore.products"
                        placeholder="Выберите продукты"
                    />
                    <MMultiSelect
                        v-model="form.filter_list"
                        :items="filterStore.filters"
                        placeholder="Выберите фильтры"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить фильтры</p>
                        <MButton color="success" size="small" @click="handleAddFilter">+</MButton>
                    </div>
                    <MButton color="primary" :loading="buttonsLoading['edit']" @click="submitEdit">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.delete">
                <div class="modal-content">
                    <h4>Вы действительно хотите удалить?</h4>
                    <div class="modal-actions">
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
                </div>
            </MModal>

            <MModal v-model="modalState.addFilter">
                <div class="modal-content">
                    <MInput v-model="formFilter.name" placeholder="Наименование" />
                    <MButton
                        color="primary"
                        :loading="filterStore.buttonsLoading['add']"
                        @click="submitFilter"
                    >
                        Сохранить
                    </MButton>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useMealsStore } from '../stores/meals'

import MButton from '@/components/ui/MButton.vue'
import MMealCard from '../components/ui/MMealCard.vue'
import MLoader from '../components/ui/MLoader.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '@/components/ui/MModal.vue'
import MMultiSelect from '@/components/ui/MMultiSelect.vue'
import { useProductsStore } from '../stores/products'
import { useFiltersStore } from '../stores/filters'

const mealsStore = useMealsStore()
const productsStore = useProductsStore()
const filterStore = useFiltersStore()
const { buttonsLoading } = storeToRefs(mealsStore)

const modalState = reactive({
    add: false,
    edit: false,
    delete: false,
    addFilter: false
})

const form = reactive({
    name: '',
    description: '',
    image: '',
    product_list: [],
    filter_list: [],
})

const formFilter = reactive({
    name: '',
})

const selectedMeal = ref(null)

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    mealsStore.addMeal(form).then(() => {
        toggleModal('add')
    })
}

const submitFilter = () => {
    filterStore.addFilter(formFilter).then((data) => {
        form.filter_list = [...form.filter_list, data.filter]
        
        toggleModal('addFilter')
    })

}

const submitEdit = () => {
    mealsStore.updateMeal(selectedMeal.value.id, form).then(() => {
        toggleModal('edit')
    })
}

const submitDelete = () => {
    mealsStore.deleteMeal(selectedMeal.value.id).then(() => {
        toggleModal('delete')
    })
}

const handleAdd = () => {
    form.name = ''
    form.description = ''
    form.image = ''

    toggleModal('add')
}

const handleAddFilter = () => {
    formFilter.name = ''

    toggleModal('addFilter')
}

const handleEdit = (meal) => {
    form.name = meal.name
    form.description = meal.description
    form.image = meal.image
    form.filter_list = [...meal.filter_list]
    form.product_list = [...meal.product_list]

    selectedMeal.value = meal

    toggleModal('edit')
}

const handleDelete = (meal) => {
    selectedMeal.value = meal

    toggleModal('delete')
}

onMounted(() => {
    mealsStore.getMeals()
    productsStore.getProducts()
    filterStore.getFilters()
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

    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
}

.modal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
