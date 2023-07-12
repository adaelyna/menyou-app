<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <div class="logo">
                    <RouterLink :to="{ name: 'home' }"> menyou </RouterLink>
                </div>
                <ul class="header-menu">
                    <li v-if="isMaster || user.is_admin">
                        <RouterLink :to="{ name: 'products' }">Products</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'meals' }">Meals</RouterLink>
                    </li>
                    <li>
                        <a href="#" class="header-menu__link">Order</a>
                    </li>
                    <template v-if="user.is_admin">
                        <li class="admin-menu">
                            <RouterLink :to="{ name: 'roles' }">Roles</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'users' }">Users</RouterLink>
                        </li>
                    </template>
                </ul>
                <MUserProfile color="transparent" />
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useAuthStore } from '../../stores/auth'
import MUserProfile from '../profile/MUserProfile.vue'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const isMaster = ref(false)

const checkIsMaster = () => {
    isMaster.value = authStore.user.role_list.some((role) => role.code === 'MASTER')
}

watch(
    () => user,
    () => {
        checkIsMaster()
    },
    {
        deep: true,
        immediate: true
    }
)
</script>

<style scoped lang="scss">
.header {
    background-color: #242424;

    &__inner {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.header-menu {
    display: flex;
    justify-content: center;
    gap: 20px;

    li {
        position: relative;

        a {
            font-size: 18px;
            position: relative;

            &.router-link-active {
                color: #bebebe;
            }
        }

        &.admin-menu {
            margin-left: 10px;

            &::before {
                content: '';
                position: absolute;
                left: -15px;
                bottom: 4px;
                width: 1px;
                height: 20px;
                background-color: #bebebe;
            }
        }
    }
}

.logo {
    a {
        font-size: 30px;
        line-height: 30px;
        color: #fff;
    }
}
</style>
