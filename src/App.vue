<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <!-- <ColumnList :list="list" /> -->
    <validate-form action="">
      <div class="mb-3">
        <label for="exampleFormControlInput0" class="form-label">邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          id="exampleFormControlInput0"
          v-model="emailVal"
          placeholder="请输入邮箱地址，格式如name@example.com"
          type="text"
        />
        <span>{{ emailVal }}</span>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlPassword1" class="form-label">密码</label>
        <ValidateInput
          :rules="emailRules"
          id="exampleFormControlPassword1"
          v-model="passwordVal"
          placeholder="请输入密码，密码需包含数字与字母，6-16位"
          type="password"
        />
        <span>{{ passwordVal }}</span>
      </div>
      <template #submit>
        <span class="btn btn-danger">submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateForm from './components/VaildateForm/ValidateForm.vue'
import ValidateInput, { RulesProp } from './components/VaildateForm/ValidateInput.vue'
// ColumnList模拟数据
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar:
    //   'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

// GlobalHeader模拟数据
// const currentUser: UserProps = {
//   isLogin: false
// }
const currentUser: UserProps = {
  isLogin: true,
  name: 'luminous'
}
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const list = testData
    // email
    const emailVal = ref('luminous')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱' }
    ]

    //password
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '请输入正确的密码格式' }
    ]
    return {
      list,
      currentUser,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules
    }
  }
})
</script>

<style scoped>
.app {
}
</style>
