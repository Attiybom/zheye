<template>
  <div class="register container">
    <ValidateForm @form-submit="registerSubmit">
      <div class="mb-3">
        <label for="emailInput" class="form-label">邮箱地址</label>
        <ValidateInputVue
          :rules="emailRules"
          id="emailInput"
          v-model="formData.email"
          placeholder="请输入邮箱地址，格式如name@example.com"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label for="nickNameInput" class="form-label">昵称</label>
        <ValidateInputVue
          :rules="nickNameRules"
          id="nickNameInput"
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">密码</label>
        <ValidateInputVue
          :rules="passwordRules"
          id="passwordInput"
          v-model="formData.password"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div class="mb-3">
        <label for="repeatPasswordInput" class="form-label">重复密码</label>
        <ValidateInputVue
          :rules="repeatpasswordRules"
          id="repeatPasswordInput"
          v-model="formData.repeatPassword"
          placeholder="请再次输入密码"
          type="password"
        />
      </div>
      <template #submit>
        <span class="btn btn-danger">注册新用户</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/VaildateForm/ValidateForm.vue'
import ValidateInputVue, { RulesProp } from '@/components/VaildateForm/ValidateInput.vue'
import useMessage from '@/utils/useMessage'
import instance from '@/services'
export default defineComponent({
  name: 'Register',
  components: {
    ValidateForm,
    ValidateInputVue
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const formData = reactive({
      email: '111@test.com',
      nickName: '无知小九',
      password: '111111',
      repeatPassword: '111111'
    })

    // 规则
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const nickNameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
    const repeatpasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码必须相同'
      }
    ]

    // 提交逻辑
    async function registerSubmit(result: boolean) {
      console.info('hello, register')
      if (result) {
        const payload = {
          icode: '5BDA8D85C39B561C',
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password
        }

        instance.post('/users/', payload).then(() => {
          useMessage(`注册成功，正在跳转首页页面`, 'success', 2 * 1000)
          store.dispatch('updateLoginStateAndGetUserInfoAction', {
            email: formData.email,
            password: formData.password,
            icode: '5BDA8D85C39B561C'
          })
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
      }
    }
    return {
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatpasswordRules,

      registerSubmit
    }
  }
})
</script>

<style scoped>
.register {
}
</style>
