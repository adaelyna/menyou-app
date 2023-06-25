<template>
    <div class="page">
        <div class="container">
            <h1>Роли</h1>
            <MLoader v-if="rolesStore.isLoading" />
            <MTable v-if="rolesStore.roles" :cols="cols" :rows="rolesStore.roles" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { useRolesStore } from '../stores/roles'
import MTable from '../components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'

const rolesStore = useRolesStore()
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

onMounted(() => {
    rolesStore.getRoles()
})
</script>

<style scoped lang="scss"></style>
