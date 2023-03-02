<template>
  <div class="create-post">
    <h4>新建文章</h4>
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
import { GlobalDataProps } from '@/store/store'
import { PostProps } from '@/store/store'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInputVue
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()

    const titleVal = ref('')
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]

    const contentVal = ref('')
    const contentRules: RulesProp = [{ type: 'required', message: '文章内容不能为空' }]

    function onFormSubmit(result: boolean) {
      console.info('test')

      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime() + '',
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toString()
          }
          // console.info('hello')
          store.commit('createPost', newPost) // 触发mutation
          router.push({ name: 'column', params: { id: column } }) // 路由跳转
        }
      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped></style>
