<template>
    <div class="user-profile">
        <MButton v-if="user" color="transparent">
            <span class="user-profile__button"> {{ user.firstname }} {{ user.lastname }} </span>
        </MButton>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useAuthStore } from '../../stores/auth'
import MButton from '../ui/MButton.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style scoped lang="scss">
.user-profile {
    &__button {
        font-size: 18px;
    }
}
</style>
