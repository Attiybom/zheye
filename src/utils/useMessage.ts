import { createApp, h, render } from 'vue'
import MessageVue, { MessageType } from '@/components/Message.vue'

// createApp版本
// function useMessage(message: string, type: MessageType, timeout = 2000) {
//   const messageInstance = createApp(MessageVue, {
//     // 创建组件实例
//     message,
//     type
//   })
//   const mountNode = document.createElement('div')
//   document.body.appendChild(mountNode)
//   messageInstance.mount(mountNode)
//   setTimeout(() => {
//     messageInstance.unmount()
//     document.body.removeChild(mountNode)
//   }, timeout)
// }

// h函数 + render函数 版本
function useMessage(message: string, type: MessageType, timeout?: number) {
  const messageVNode = h(MessageVue, {
    // 使用h函数创建vnode
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  render(messageVNode, mountNode) // 将vnode节点挂载到某个特定节点上

  // 卸载vnode函数
  function unmountVNode() {
    render(null, mountNode) // 把节点上的vnode卸载掉
    document.body.removeChild(mountNode)
  }
  if (timeout) {
    setTimeout(() => {
      unmountVNode()
    }, timeout)
  }

  return {
    //返回卸载vnode方法
    unmountVNode
  }
}
export default useMessage
