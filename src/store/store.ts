import { createStore, Commit } from 'vuex'
import instance from '@/services'
import axios from 'axios'
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string
}

export interface ResponseType<P = Record<string, never>> {
  code: number
  msg: string
  data: P
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  token: string
  error: GlobalErrorProps
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await instance.get(url)
  commit(mutationName, data)
  return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await instance.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    user: { isLogin: false },
    columns: [],
    posts: [{ _id: '', title: '', createdAt: '', column: '' }],
    token: localStorage.getItem('token') || '',
    error: { status: false }
  },
  getters: {
    getColumnById(state) {
      // console.info('hello', state.columns)
      // return (id: string) => state.columns.find((c) => c._id === id)
      return function (id: string) {
        return state.columns.find((c) => c._id === id)
      }
      // console.info('hi')
    },
    getPostByCid(state) {
      return (cid: string) => state.posts.filter((post) => post.column === cid)
    }
  },
  mutations: {
    // updateLoginState(store) {
    //   store.user = { ...store.user, isLogin: true, name: 'luminous', columnId: 1 }
    // },
    createPost(state, newPost) {
      state.posts.push(newPost)
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
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, error: GlobalErrorProps) {
      state.error = error
    },
    updateLoginState(state, rawData) {
      // console.info('rawData', rawData)
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      instance.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    getUserInfo(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumnsAction({ commit }) {
      //请求全部column
      //context和store拥有相同方法与属性，但不是store本身
      return getAndCommit('/columns', 'handlerColumns', commit)
    },
    fetchColumnAction({ commit }, cid) {
      //请求单个column
      return getAndCommit(`/columns/${cid}`, 'handlerColumn', commit)
    },
    fetchPostsAction({ commit }, cid) {
      //请求全部post
      return getAndCommit(`/columns/${cid}/posts`, 'handlerPosts', commit)
    },
    updateLoginStateAction({ commit }, payload: any) {
      return postAndCommit(`/user/login`, 'updateLoginState', commit, payload)
    },
    getUserInfoAction({ commit }) {
      return getAndCommit(`/user/current`, 'getUserInfo', commit)
    },
    updateLoginStateAndGetUserInfoAction({ dispatch }, loginData) {
      return dispatch('updateLoginStateAction', loginData).then(() => {
        return dispatch(`getUserInfoAction`)
      })
      // const res = await dispatch('updateLoginState', loginData)
      // return dispatch(`getUserInfo`)
    },
    createPostAction({ commit }, payload) {
      return postAndCommit(`/posts`, 'createPost', commit, payload)
    }
  }
})

export default store
