import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '@/mock/mock'
interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id)
    },
    getPostById: (state) => (id: number) => {
      return state.posts.filter((c) => c.columnId === id)
    }
  },
  mutations: {
    updateLoginState(store) {
      store.user = { ...store.user, isLogin: true, name: 'luminous' }
    }
  }
})

export default store
