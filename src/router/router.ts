import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('@/views/Login.vue')
const HomeView = () => import('@/views/Home.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('@/views/ColumnDetail.vue')
    }
  ]
})

export default router
