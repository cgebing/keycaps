<script setup lang="ts">

import {Ref} from 'vue'

interface Area {
  text?: string | Ref<string>,
  justifyContent?: string | Ref<string>,
  alignItems?: string | Ref<string>
}

interface Props {
  area: Area,
  justifyContent?: string | Ref<string>,
  alignItems?: string | Ref<string>
}

const props = defineProps<Props>()

props.area.justifyContent = props.area.justifyContent || props.justifyContent || 'center'
props.area.alignItems ||= props.area.alignItems || props.alignItems || 'center'

</script>

<template>
  <div class="area">
    <span v-if="props.area.text">{{ props.area.text }}</span>
  </div>
</template>

<style scoped>
.area {
  display: flex;
  align-items: v-bind('area.alignItems');
  justify-content: v-bind('area.justifyContent');
}
</style>
