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
                    <MButton v-if="row.is_blocked" color="transparent" @click="handleUnblock(row)">
                        <svg
                            class="lock-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                                stroke="#A6A6A6"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                                stroke="#A6A6A6"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </MButton>
                    <MButton v-else color="transparent" @click="handleBlock(row)">
                        <img src="@/assets/images/unlock-icon-gray.svg" alt="Заблокировать" />
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
                    <MMultiSelect v-model="form.role_list" :items="rolesStore.roles" />
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
                    <MMultiSelect v-model="form.role_list" :items="rolesStore.roles" />
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

            <MModal v-model="modalState.block">
                <div class="modal-content">
                    <h4>Заблокировать пользователя?</h4>
                    <div class="modal-actions">
                        <MButton
                            color="primary"
                            full
                            :loading="buttonsLoading['edit']"
                            @click="submitBlock"
                        >
                            Да
                        </MButton>
                        <MButton full @click="toggleModal('block')"> Нет </MButton>
                    </div>
                </div>
            </MModal>

            <MModal v-model="modalState.unblock">
                <div class="modal-content">
                    <h4>Разблокировать пользователя?</h4>
                    <div class="modal-actions">
                        <MButton
                            color="primary"
                            full
                            :loading="buttonsLoading['edit']"
                            @click="submitUnblock"
                        >
                            Да
                        </MButton>
                        <MButton full @click="toggleModal('unblock')"> Нет </MButton>
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
import MMultiSelect from '@/components/ui/MMultiSelect.vue'

const usersStore = useUsersStore()
const rolesStore = useRolesStore()
const { buttonsLoading } = storeToRefs(usersStore)

const cols = [
    {
        key: 'image',
        name: 'Аватарка'
    },
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
        key: 'role_list',
        name: 'Роль'
    }
]

const modalState = reactive({
    add: false,
    edit: false,
    delete: false,
    block: false,
    unblock: false
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

const setForm = (row) => {
    form.username = row.username
    form.firstname = row.firstname
    form.lastname = row.lastname
    form.image = row.image
    form.role_list = row.role_list
}

const handleAdd = () => {
    form.username = ''
    form.firstname = ''
    form.lastname = ''
    form.image = ''
    form.role_list = []

    toggleModal('add')
}

const handleEdit = (row) => {
    setForm(row)

    selectedRow.value = row

    toggleModal('edit')
}

const handleDelete = (row) => {
    selectedRow.value = row

    toggleModal('delete')
}

const handleBlock = (row) => {
    setForm(row)

    selectedRow.value = row

    toggleModal('block')
}

const handleUnblock = (row) => {
    setForm(row)

    selectedRow.value = row

    toggleModal('unblock')
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

const submitBlock = () => {
    usersStore
        .updateUser(selectedRow.value.id, {
            ...form,
            is_blocked: true
        })
        .then(() => {
            toggleModal('block')
        })
}

const submitUnblock = () => {
    usersStore
        .updateUser(selectedRow.value.id, {
            ...form,
            is_blocked: false
        })
        .then(() => {
            toggleModal('unblock')
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

.lock-icon {
    path {
        stroke: $orange;
    }
}
</style>
