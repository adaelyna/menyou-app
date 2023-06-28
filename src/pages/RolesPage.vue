<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Роли</h1>
                <MButton color="primary" @click="toggleModal('add')">Добавить</MButton>
            </div>
            <MLoader v-if="rolesStore.isLoading" />
            <MTable v-if="rolesStore.roles" :cols="cols" :rows="rolesStore.roles">
                <template #actions="{ id }">
                    <MButton color="transparent">
                        <img src="@/assets/images/edit-icon-color.svg" alt="Редактировать" />
                    </MButton>
                    <MButton color="transparent" @click="handleDelete(id)">
                        <img src="@/assets/images/delete-icon-color.svg" alt="Удалить" />
                    </MButton>
                </template>
            </MTable>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="form.code" placeholder="Код" />
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MButton color="primary" :loading="buttonsLoading['add']" @click="submit">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.delete">
                <div class="modal-content">
                    <h4>Вы действительно хотите удалить?</h4>
                    <div class="modal-actions">
                        <MButton color="primary" full> Да </MButton>
                        <MButton full> Нет </MButton>
                    </div>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
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

onMounted(() => {
    rolesStore.getRoles()
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submit = () => {
    rolesStore.addRole(form)
}

const handleDelete = (id) => {
    rolesStore.deleteRole(id)
}
</script>

<style scoped lang="scss">
.box {
    position: relative;
    background-color: rgb(235, 235, 235);
    padding: 24px;
    border-radius: 16px;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 24px;
}

.close {
    font-size: 18px;
    position: absolute;
    top: 6px;
    right: 6px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
        transform: rotate(90deg);
    }
}

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
