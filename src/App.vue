<template>
  <div class="container">
    <!-- <VNode msg="hello,VNode" /> -->
    <GlobalHeader :user="currentUser" />
    <!-- <Message type="error" :message="error.message" v-if="error.status" /> -->
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
import { defineComponent, computed, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from './store/store'
import { useRouter } from 'vue-router'
import useMessage from '@/utils/useMessage'
// import VNode from './components/VNode'
// import Message from './components/Message.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
    // VNode
    // Message
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    function beforeUpload(file: File) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        useMessage('图片格式只能是 JPG 格式', 'error')
      }
      return isJPG
    }

    function onFileUploaded(rawData: any) {
      console.info(rawData)
      useMessage(`上传图片id${rawData.data._id}`, 'success')
    }

    function onFileUploadedError(err: any) {
      console.info(err)
      useMessage(`上传图片失败`, 'error')
    }
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value
        if (status && message) {
          useMessage(message, 'error')
        }
      }
    )
    return {
      currentUser,
      isLoading,
      error,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  }
})
</script>

<style scoped></style>
