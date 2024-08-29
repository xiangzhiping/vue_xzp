import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '/login', component: () => import('@/views/login.vue')},
    {
        path: '/', component: () => import('@/views/main.vue'),
        children: [
            {
                path: 'dashboard', component: () => import('@/views/Dashboard.vue'),
            },
            {
                path: 'user/', component: () => import('@/views/user.vue')
            },
            {
                path: 'user/role', component: () => import('@/components/user_role/user_role.vue'),
            },
            {
                path: 'user/permission', component: () => import('@/views/user.vue')
            },
            {
                path: 'personal', component: () => import('@/views/personal.vue')
            },
            {
                path: 'setting', component: () => import('@/views/setting.vue')
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
