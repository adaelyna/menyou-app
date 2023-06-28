<template>
    <div class="page">
        <div class="container">
            <h1>Пользователи</h1>
            <MLoader v-if="usersStore.isLoading" />
            <MTable v-if="usersStore.users" :cols="cols" :rows="usersStore.users">
                <template #actions>
                    <MButton color="transparent">
                        <img src="@/assets/images/edit-icon-color.svg" alt="Редактировать" />
                    </MButton>
                    <MButton color="transparent">
                        <img src="@/assets/images/delete-icon-color.svg" alt="Удалить" /> </MButton
                ></template>
            </MTable>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { useUsersStore } from '../stores/users'
import MTable from '../components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MButton from '../components/ui/MButton.vue'

const usersStore = useUsersStore()
const cols = [
    {
        key: 'username',
        name: 'Логин'
    },
    {
        key: 'firstname',
        name: 'Имя'
    }
]

onMounted(() => {
    usersStore.getUsers()
})
</script>

<style scoped lang="scss"></style>
