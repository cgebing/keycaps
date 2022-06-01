<script setup lang="ts">
import Keycap from './Keycap.vue'
import {computed, inject, ref} from 'vue'

const store = inject('store')

interface Props {
  row: any
}

const props = defineProps<Props>()
const addKeycap = (type) => {
  props.row.push(
    {
      type
    }
  )
}
const type = ref('')
const types = computed(() => Object.keys(store.state.keycaps))
</script>

<template>
  <div class="row">
    <Keycap v-for="keycap in props.row" :keycap="keycap"/>
    <div class="controls">
      <select v-model="type">
        <option v-for="type in types" >{{ type }}</option>
      </select>
      <button :disabled="type === ''" @click="addKeycap(type)">+</button>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
}
@media print {
  .controls {
    display: none
  }
}
</style>
