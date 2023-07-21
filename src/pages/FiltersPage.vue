<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Фильтры</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>

            <MLoader v-if="filtersStore.isLoading" />

            <MTable v-if="filtersStore.filters" :cols="cols" :rows="filtersStore.filters">
                <template #actions="{ row }">
                    <MButton color="transparent" @click="handleEdit(row)">
                        <img src="@/assets/images/edit-icon-color.svg" alt="Редактировать" />
                    </MButton>
                    <MButton color="transparent" @click="handleDelete(row)">
                        <img src="@/assets/images/delete-icon-color.svg" alt="Удалить" />
                    </MButton>
                </template>
            </MTable>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MButton color="primary" :loading="buttonsLoading['add']" @click="submitAdd">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="form.name" placeholder="Наименование" />
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
                            :loading="buttonsLoading['delete']"
                            @click="submitDelete"
                        >
                            Да
                        </MButton>
                        <MButton full @click="toggleModal('delete')"> Нет </MButton>
                    </div>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useFiltersStore } from '../stores/filters'

import MTable from '@/components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MButton from '@/components/ui/MButton.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '@/components/ui/MModal.vue'

const filtersStore = useFiltersStore()
const { buttonsLoading } = storeToRefs(filtersStore)
const modalState = reactive({
    add: false,
    edit: false,
    delete: false
})

const cols = [
    {
        key: 'id',
        name: 'Номер'
    },
    {
        key: 'name',
        name: 'Имя'
    }
]

const selectedRow = ref(null)

const form = reactive({
    name: ''
})

onMounted(() => {
    filtersStore.getFilters()
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    filtersStore.addFilter(form).then(() => {
        toggleModal('add')
    })
}

const submitEdit = () => {
    filtersStore.updateFilter(selectedRow.value.id, form).then(() => {
        toggleModal('edit')
    })
}

const submitDelete = () => {
    filtersStore.deleteFilter(selectedRow.value.id).then(() => {
        toggleModal('delete')
    })
}

const handleAdd = () => {
    form.name = ''

    toggleModal('add')
}

const handleEdit = (row) => {
    form.name = row.name

    selectedRow.value = row

    toggleModal('edit')
}

const handleDelete = (row) => {
    selectedRow.value = row

    toggleModal('delete')
}
</script>

<style scoped lang="scss">
.modal-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.modal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
