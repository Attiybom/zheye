<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click.prevent="handlerHide"
      ></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useCreateNode from '@/hooks/useCreateNode'
export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'Message',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, context) {
    useCreateNode('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    function handlerHide() {
      isVisible.value = false
      context.emit('close-message', true)
    }

    return {
      isVisible,
      handlerHide,
      classObject
    }
  }
})
</script>

<style scoped>
.message {
}
</style>
