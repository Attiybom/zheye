<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
type Event = {
  'form-item-created': ValidateFunc
}
export const emitter = mitt<Event>()
export default defineComponent({
  name: 'ValidateInput',
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr: ValidateFunc[] = []
    function submitForm() {
      // 点击按钮，对存有验证结果的数组进行循环验证
      const result = funcArr.map((func) => func()).every((result) => result)
      context.emit('form-submit', result) // 发送结果
    }
    function VaildateFormCallback(func: ValidateFunc) {
      if (func) {
        funcArr.push(func)
      }
    }

    emitter.on('form-item-created', VaildateFormCallback)

    onBeforeUnmount(() => {
      emitter.off('form-item-created', VaildateFormCallback)
      funcArr.length = 0
    })
    return {
      submitForm
    }
  }
})
</script>

<style scoped>
.validate-input {
}
</style>
