<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <h1>{{ error.message }}</h1>
    <Loader v-if="isLoading" background="rgba(0, 0, 0, 0.8)" text="拼命加载中" />
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from './store/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        // instance.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('getUserInfoAction')
        router.push('/')
      }
      // else if (!currentUser.value.isLogin && !token.value) {
      //   router.push('/login')
      // }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style scoped></style>
