<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <div class="logo">
                    <RouterLink to="/">
                        menyou
                    </RouterLink>
                </div>
                <ul class="header-menu">
                    <li class="header-menu__item">
                        <a href="#" class="header-menu__link">Products</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#" class="header-menu__link">Meals</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#" class="header-menu__link">Order</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#" class="header-menu__link">Role</a>
                    </li>
                </ul>
                <!-- <MUserProfile /> -->
            </div>
        </div>
    </header>
</template>

<script setup></script>

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
            color: #fff;
            font-size: 18px;

            &:hover {
                color: #afafaf;
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
