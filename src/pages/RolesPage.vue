<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Роли</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>

            <MLoader v-if="rolesStore.isLoading" />

            <MTable v-if="rolesStore.roles" :cols="cols" :rows="rolesStore.roles">
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
                    <MInput v-model="form.code" placeholder="Код" />
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MButton color="primary" :loading="buttonsLoading['add']" @click="submitAdd">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="form.code" placeholder="Код" />
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

import { useRolesStore } from '../stores/roles'
import MTable from '../components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MButton from '../components/ui/MButton.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '../components/ui/MModal.vue'

const rolesStore = useRolesStore()
const { buttonsLoading } = storeToRefs(rolesStore)
const modalState = reactive({
    add: false,
    edit: false,
    delete: false
})

const cols = [
    {
        key: 'code',
        name: 'Код'
    },
    {
        key: 'name',
        name: 'Наименование'
    }
]

const form = reactive({
    code: '',
    name: ''
})

const selectedRow = ref(null)

onMounted(() => {
    rolesStore.getRoles()
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    rolesStore.addRole(form).then(() => {
        toggleModal('add')
    })
}

const submitEdit = () => {
    rolesStore.updateRole(selectedRow.value.id, form).then(() => {
        toggleModal('edit')
    })
}

const submitDelete = () => {
    rolesStore.deleteRole(selectedRow.value.id).then(() => {
        toggleModal('delete')
    })
}

const handleAdd = () => {
    form.code = ''
    form.name = ''

    toggleModal('add')
}

const handleDelete = (row) => {
    selectedRow.value = row

    toggleModal('delete')
}

const handleEdit = (row) => {
    form.code = row.code
    form.name = row.name

    selectedRow.value = row

    toggleModal('edit')
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
