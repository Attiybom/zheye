<template>
  <div class="row">
    <template v-for="column in columnList" :key="column.id">
      <div class="col-4 mb-4 card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '@/mock/mock'
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
          item.avatar = require('@/assets/column.jpg')
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

<style scoped></style>
