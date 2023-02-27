import { createRouter, createWebHistory } from 'vue-router'

// login
const LoginView = () => import('@/views/Login.vue')
// home
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
    }
  ]
})

export default router
