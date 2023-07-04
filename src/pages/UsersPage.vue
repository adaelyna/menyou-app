<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Пользователи</h1>
                <MButton color="primary" @click="handleAdd">Добавить</MButton>
            </div>
            <MLoader v-if="usersStore.isLoading" />
            <MTable v-if="usersStore.users" :cols="cols" :rows="usersStore.users">
                <template #actions>
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
                    <MButton color="primary" :loading="buttonsLoading['edit']" @click="submitEdit">
                        Сохранить
                    </MButton>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import { useUsersStore } from '../stores/users'
import { useRolesStore } from '../stores/roles'
import MTable from '../components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MButton from '../components/ui/MButton.vue'
import MModal from '@/components/ui/MModal.vue'
import MInput from '@/components/ui/MInput.vue'
import MSelect from '../components/ui/MSelect.vue'
import { storeToRefs } from 'pinia'

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
    }
]

const modalState = reactive({
    add: false,
    edit: false,
    delete:false
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const form = reactive({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    role_list: []
})

const selectedRow = ref(null)

const handleAdd = () => {
    toggleModal('add')
}

const handleEdit = (row) => {
    form.username = row.username
    form.firstname = row.firstname

    selectedRow.value = row

    toggleModal('edit')
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
</style>
