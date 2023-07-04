<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <div class="logo">
                    <RouterLink :to="{ name: 'home' }"> menyou </RouterLink>
                </div>
                <ul class="header-menu">
                    <li class="header-menu__item">
                        <RouterLink :to="{ name: 'products' }">Products</RouterLink>
                    </li>
                    <li class="header-menu__item">
                        <RouterLink :to="{ name: 'meals' }">Meals</RouterLink>
                    </li>
                    <li class="header-menu__item">
                        <a href="#" class="header-menu__link">Order</a>
                    </li>
                    <li class="header-menu__item">
                        <RouterLink :to="{ name: 'roles' }">Roles</RouterLink>
                    </li>
                    <li class="header-menu__item">
                        <RouterLink :to="{ name: 'users' }">Users</RouterLink>
                    </li>
                </ul>
                <MUserProfile color="transparent" />
            </div>
        </div>
    </header>
</template>

<script setup>
import MUserProfile from '../profile/MUserProfile.vue'
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
        a {
            font-size: 18px;
            position: relative;

            &.router-link-active {
                color: #bebebe;

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -5px;
                    width: 100%;
                    height: 1px;
                    background-color: #bebebe;
                }
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
