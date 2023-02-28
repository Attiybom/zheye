<template>
  <div class="column-detail w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border w-100" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const currentId = route.params.id

    onMounted(() => {
      store.dispatch('fetchColumnAction', currentId)
      store.dispatch('fetchPostsAction', currentId)
    })
    const column = computed(() => store.getters.getColumnById(currentId))
    // console.info(store.state.columns)
    const list1 = computed(() => store.getters.getPostByCid(currentId))
    // console.info(store.state.posts)
    return {
      column,
      list1
    }
  }
})
</script>

<style scoped></style>
