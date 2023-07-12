<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Пользователи</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>
            <MLoader v-if="usersStore.isLoading" />
            <MTable v-if="usersStore.users" :cols="cols" :rows="usersStore.users">
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
                    <MInput v-model="form.username" placeholder="Логин" />
                    <MInput v-model="form.password" placeholder="Пароль" type="password" />
                    <MInput v-model="form.firstname" placeholder="Имя" />
                    <MInput v-model="form.lastname" placeholder="Фамилия" />
                    <MInput v-model="form.image" placeholder="Аватарка" />
                    <MSelect v-model="form.role_list" :items="rolesStore.roles" />
                    <MButton color="primary" :loading="buttonsLoading.add" @click="submitAdd">
                        Сохранить
                    </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="form.username" placeholder="Логин" />
                    <MInput v-model="form.firstname" placeholder="Имя" />
                    <MInput v-model="form.lastname" placeholder="Фамилия" />
                    <MInput v-model="form.image" placeholder="Аватарка" />
                    <MSelect v-model="form.role_list" :items="rolesStore.roles" />
                    <MButton color="primary" :loading="buttonsLoading.edit" @click="submitEdit">
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

import { useUsersStore } from '../stores/users'
import { useRolesStore } from '../stores/roles'
import MTable from '../components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MButton from '../components/ui/MButton.vue'
import MModal from '@/components/ui/MModal.vue'
import MInput from '@/components/ui/MInput.vue'
import MSelect from '../components/ui/MSelect.vue'

const usersStore = useUsersStore()
const rolesStore = useRolesStore()
const { buttonsLoading } = storeToRefs(usersStore)

const cols = [
    {
        key: 'username',
        name: 'Логин'
    },
    {
        key: 'firstname',
        name: 'Имя'
    },
    {
        key: 'lastname',
        name: 'Фамилия'
    },
    {
        key: 'image',
        name: 'Аватарка'
    }
]

const modalState = reactive({
    add: false,
    edit: false,
    delete: false
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const form = reactive({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    image: '',
    role_list: []
})

const selectedRow = ref(null)

const handleAdd = () => {
    form.username = ''
    form.firstname = ''
    form.lastname = ''
    form.image = ''
    form.role_list = []

    toggleModal('add')
}

const handleEdit = (row) => {
    form.username = row.username
    form.firstname = row.firstname
    form.lastname = row.lastname
    form.image = row.image
    form.role_list = row.role_list    

    selectedRow.value = row

    toggleModal('edit')
}

const handleDelete = (row) => {
    selectedRow.value = row

    toggleModal('delete')
}

const submitAdd = () => {
    usersStore.addUser(form).then(() => {
        toggleModal('add')
    })
}

const submitEdit = () => {
    usersStore.updateUser(selectedRow.value.id, form).then(() => {
        toggleModal('edit')
    })
}

const submitDelete = () => {
    usersStore.deleteUser(selectedRow.value.id).then(() => {
        toggleModal('delete')
    })
}

onMounted(() => {
    usersStore.getUsers()
    rolesStore.getRoles()
})
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
