import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

// export default function useClickOutSide(elementRef: Ref<null | HTMLElement>) {
//   const isClickOutside = ref(false)
//   function handler(e: MouseEvent) {
//     if (elementRef.value) {
//       if (elementRef.value.contains(e.target as HTMLElement)) {
//         isClickOutside.value = false
//       } else {
//         isClickOutside.value = true
//       }
//     }
//   }

//   onMounted(() => {
//     document.addEventListener('click', handler)
//   })

//   onBeforeUnmount(() => {
//     document.removeEventListener('click', handler)
//   })

//   return isClickOutside
// }

export default function useClickOutSide(elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false)
  function handler(e: MouseEvent) {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}
