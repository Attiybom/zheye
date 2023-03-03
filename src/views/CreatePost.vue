<template>
  <div class="create-post">
    <h4>新建文章</h4>
    <Uploader
      action="/upload"
      :before-upload="uploadCheck"
      @file-uploaded="handleFileUpload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData && dataProps.uploadedData.data.url" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </Uploader>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInputVue
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInputVue
          :rules="contentRules"
          v-model="contentVal"
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/VaildateForm/ValidateForm.vue'
import ValidateInputVue, { RulesProp } from '@/components/VaildateForm/ValidateInput.vue'
import { GlobalDataProps, ImageProps, ResponseType, PostProps } from '@/store/store'
import Uploader from '@/components/Uploader.vue'
import useMessage from '@/utils/useMessage'
import { beforeUploadCheck } from '@/utils/checkIMG'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInputVue,
    Uploader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()

    const titleVal = ref('')
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]

    const contentVal = ref('')
    const contentRules: RulesProp = [{ type: 'required', message: '文章内容不能为空' }]

    let imgId = ''

    function onFormSubmit(result: boolean) {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toString(),
            author: _id
          }
          if (imgId) {
            newPost.image = imgId
          }
          store.dispatch('createPostAction', newPost).then(() => {
            useMessage('发布成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } }) // 路由跳转
            }, 2000)
          })
        }
      }
    }

    function uploadCheck(file: File) {
      const { passed, error } = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      if (error === 'format') {
        useMessage('图片格式必须是 JPG或者PNG 格式', 'error')
      }
      if (error === 'size') {
        useMessage('图片大小不能超过1mb', 'error')
      }
      return passed
    }

    function handleFileUpload(rawData: ResponseType<ImageProps>) {
      if (rawData.data._id) {
        imgId = rawData.data._id
      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadCheck,
      handleFileUpload
    }
  }
})
</script>

<style>
.create-post .file-upload-container {
  height: 200px;
  cursor: pointer;
}
</style>
