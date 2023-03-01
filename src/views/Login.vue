<template>
  <div class="container">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleFormControlInput0" class="form-label">邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          id="exampleFormControlInput0"
          v-model="emailVal"
          placeholder="请输入邮箱地址，格式如name@example.com"
          type="text"
          ref="inputRef"
        />
        <span>{{ emailVal }}</span>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlPassword1" class="form-label">密码</label>
        <ValidateInput
          :rules="passwordRules"
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import ValidateForm from '@/components/VaildateForm/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/VaildateForm/ValidateInput.vue'
import useMessage from '@/utils/useMessage'

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    ValidateInput,
    ValidateForm
  },
  setup() {
    //获取信息
    const store = useStore()
    //路由跳转
    const router = useRouter()
    // email
    const emailVal = ref('111@test.com')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]

    //password
    const passwordVal = ref('111111')
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]

    //获取input组件实例
    const inputRef = ref()

    //form-submit
    function onFormSubmit(result: boolean) {
      if (result) {
        // 验证的结果正确,则执行下列逻辑
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
          icode: '5BDA8D85C39B561C'
        }
        // store.dispatch('updateLoginStateAction', payload).then((res) => {
        //   console.info('res', res)
        //   router.push('/')
        //   store.dispatch('getUserInfoAction')
        // })
        store
          .dispatch('updateLoginStateAndGetUserInfoAction', payload)
          .then((res) => {
            useMessage('登录成功，2秒后跳转首页', 'success')
            setTimeout(() => {
              router.push('/')
            }, 2000)
          })
          .catch((err) => {
            console.info('err', err)
          })
      } else {
        console.info('hello')
        // emailVal.value = '66'
        // passwordVal.value = '667'
        console.info('hi')
      }
    }

    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style scoped></style>
