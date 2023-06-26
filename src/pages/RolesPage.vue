<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <h1>Роли</h1>
                <MButton color="primary" @click="openModal">Добавить</MButton>
            </div>
            <MLoader v-if="rolesStore.isLoading" />
            <MTable v-if="rolesStore.roles" :cols="cols" :rows="rolesStore.roles" />

            <div v-if="isOpen" class="box">
                <div class="close" @click="closeModal">x</div>
                <div class="modal-content">
                    <MInput v-model="form.code" placeholder="Код" />
                    <MInput v-model="form.name" placeholder="Наименование" />
                    <MButton color="primary" @click="submit">Сохранить</MButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import { useRolesStore } from '../stores/roles'
import MTable from '../components/ui/MTable.vue'
import MLoader from '@/components/ui/MLoader.vue'
import MButton from '../components/ui/MButton.vue'
import MInput from '@/components/ui/MInput.vue'

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

const isOpen = ref(false)
const form = reactive({
    code: '',
    name: ''
})

onMounted(() => {
    rolesStore.getRoles()
})

const openModal = () => {
    isOpen.value = true
    console.log('handleModal')
}

const closeModal = () => {
    isOpen.value = false
}

const submit = () => {
    rolesStore.addRole(form)
    isOpen.value = false
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
</style>
