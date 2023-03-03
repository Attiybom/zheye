import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store'
import instance from '@/services'

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
      component: LoginView,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('@/views/ColumnDetail.vue'),
      meta: { requiredLogin: true }
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: () => import('@/views/CreatePost.vue'),
      meta: { requiredLogin: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    }
  ]
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // console.info('hello,store:', store)
//   if (to.meta.requiredLogin && !store.state.user.isLogin) {
//     next('/login') // 未登录状态全部重定向到登录界面
//   } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
//     next('/') // 处于已登录状态，再次点击登录页面的时候，重定向到home
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    // 没有登录
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`
      store
        .dispatch('getUserInfoAction')
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        })
        .catch((err) => {
          console.error('err', err)
          store.commit('logout')
          next('/login')
        })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    // 已经登录
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
