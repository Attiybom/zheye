<template>
  <div class="uploader">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileUploadStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot v-else-if="fileUploadStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <span class="btn btn-primary">上传成功</span>
      </slot>
      <slot v-else name="default">
        <span class="btn btn-primary">点击上传</span>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInputRef"
      @change="handleFileStatusChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import instance from '@/services'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInputRef = ref<null | HTMLInputElement>(null)
    const fileUploadStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    // 点击上传按钮
    function triggerUpload() {
      if (fileInputRef.value) {
        fileInputRef.value.click()
      }
    }

    // 上传组件状态发送变化
    function handleFileStatusChange(e: Event) {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          // 检查文件格式是否正确
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileUploadStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        instance
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            fileUploadStatus.value = 'success'
            uploadedData.value = res.data
            context.emit('file-uploaded', res.data)
          })
          .catch((err) => {
            fileUploadStatus.value = 'error'
            context.emit('file-uploaded-error', { err })
          })
          .finally(() => {
            // console.info('finally')
            if (fileInputRef.value) {
              fileInputRef.value.value = ''
            }
          })
      }
    }
    return {
      fileInputRef,
      triggerUpload,
      fileUploadStatus,
      handleFileStatusChange,
      uploadedData
    }
  }
})
</script>

<style>
.file-upload-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
