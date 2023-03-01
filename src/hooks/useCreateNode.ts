import { onBeforeUnmount } from 'vue'

export default function useCreateNode(nodeId: string) {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
  onBeforeUnmount(() => {
    document.body.removeChild(node)
  })
}
