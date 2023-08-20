import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/LoginPage.vue')
        },
        {
            path: '/users',
            name: 'users',
            component: () => import ('../pages/UsersPage.vue')
        },
        {
            path: '/roles',
            name: 'roles',
            component: () => import ('../pages/RolesPage.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () => import ('../pages/ProductsPage.vue')
        },
        {
            path: '/meals',
            name: 'meals',
            component: () => import ('../pages/MealsPage.vue')
        },
        {
            path: '/filters',
            name: 'filters',
            component: () => import ('../pages/FiltersPage.vue')
        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import ('../pages/OrdersPage.vue')
        }
    ]
})

export default router
