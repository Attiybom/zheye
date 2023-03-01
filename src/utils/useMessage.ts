import { createApp } from 'vue'
import MessageVue, { MessageType } from '@/components/Message.vue'

function useMessage(message: string, type: MessageType, timeout = 2000) {
  const messageInstance = createApp(MessageVue, {
    // 创建组件实例
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default useMessage
