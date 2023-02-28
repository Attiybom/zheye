<template>
  <div class="row">
    <template v-for="column in columnList" :key="column._id">
      <div class="col-4 mb-4 card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar?.url"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '@/store/store'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      require: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list?.map((item) => {
        if (!item.avatar) {
          item.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          // 没有图片的话，就显示默认图片，并限制大小
          item.avatar.url = item.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        }
        return item
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
