import { createStore } from 'vuex'
import instance from '@/services'
interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
  column: string
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [{ _id: '', title: '', createdAt: '', column: '' }],
    user: {
      isLogin: false
    }
  },
  getters: {
    getColumnById(state) {
      // console.info('hello', state.columns)
      // return (id: string) => state.columns.find((c) => c._id === id)
      return function (id: string) {
        console.info(Array.isArray(state.columns))
        return state.columns.find((c) => c._id === id)
      }
      // console.info('hi')
    },
    getPostByCid(state) {
      return (cid: string) => state.posts.filter((post) => post.column === cid)
    }
  },
  mutations: {
    updateLoginState(store) {
      store.user = { ...store.user, isLogin: true, name: 'luminous', columnId: 1 }
    },
    handlerColumns(state, rawData) {
      //请求全部column
      state.columns = rawData.data.list
    },
    handlerColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    handlerPosts(state, rawData) {
      state.posts = rawData.data.list
    }
  },
  actions: {
    fetchColumnsAction(context) {
      //请求全部column
      //context和store拥有相同方法与属性，但不是store本身
      instance.get('/columns').then((res) => {
        // console.info('res', res)
        context.commit('handlerColumns', res.data)
      })
    },
    fetchColumnAction({ commit }, cid) {
      //请求单个column
      instance.get(`/columns/${cid}`).then((res) => {
        console.info('fetchColumnAction', res.data)
        commit('handlerColumn', res.data)
      })
    },
    fetchPostsAction({ commit }, cid) {
      //请求全部post
      instance.get(`/columns/${cid}/posts`).then((res) => {
        // console.info('fetchPostsAction', res.data)
        commit('handlerPosts', res.data)
      })
    }
  }
})

export default store
