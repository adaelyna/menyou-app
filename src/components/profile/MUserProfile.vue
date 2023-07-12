<template>
    <div class="user-profile">
        <MButton color="transparent" @click="handleDropdown">
            <div class="user-profile__button">
                <div class="user-profile__image">
                    <img :src="user.image" :alt="user.username" />
                </div>
                <span class="user-profile__text"> {{ user.firstname }} {{ user.lastname }} </span>
            </div>
        </MButton>

        <div v-if="isOpen" class="dropdown">
            <ul>
                <li>
                    <RouterLink to="/">
                        <img src="@/assets/images/user-icon.svg" alt="Профиль" />
                        <span>Профиль</span>
                    </RouterLink>
                </li>
                <li>
                    <MButton color="transparent" @click="logoutUser">
                        <img src="@/assets/images/logout-icon.svg" alt="Выйти" />
                        <span>Выйти</span>
                    </MButton>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useAuthStore } from '../../stores/auth'
import MButton from '../ui/MButton.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const isOpen = ref(false)

const handleDropdown = () => {
    isOpen.value = !isOpen.value
}

const logoutUser = () => {
    authStore.logoutUser()
}
</script>

<style scoped lang="scss">
.user-profile {
    position: relative;

    &__button {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__text {
        font-size: 18px;
    }
}

.dropdown {
    position: absolute;
    right: 0;
    top: 36px;
    background-color: #fff;
    padding: 12px;
    border-radius: 6px;
    box-shadow: 1px 1px 10px #2424241a;

    ul {
        li {
            margin-bottom: 8px;

            a {
                color: #242424;
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .btn.transparent {
                color: #242424;
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
        }
    }
}
</style>
