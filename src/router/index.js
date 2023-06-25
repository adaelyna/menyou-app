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
        }
    ]
})

export default router
