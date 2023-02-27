<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ValidateInput',
  setup() {
    return {}
  }
})
</script>

<style scoped>
.validate-input {
}
</style>
