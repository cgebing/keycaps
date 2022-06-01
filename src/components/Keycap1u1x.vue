<script setup lang="ts">
import KeycapArea from './KeycapArea.vue'
import {computed, ref} from 'vue'

interface Keycap {
  area1?: any
}

interface Props {
  keycap: Keycap
}

const props = defineProps<Props>()

props.keycap.area1 ||= ref({});
</script>

<template>
  <div class="keycap">
    <div class="keycap-inner">
      <KeycapArea :area="props.keycap.area1" justify-content="flex-start" />
    </div>
  </div>
</template>

<style scoped>
.keycap {
  border: 1px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 18.2mm;
  height: 18.2mm;
  border-radius: 1mm;

  cursor: pointer;
}

.keycap-inner {
  border: 1px solid #555;
  position: relative;
  border-radius: 3.75mm;
  display: grid;

  width: 15.95mm;
  height: 15.95mm;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  padding: 1.95mm;

  box-sizing: border-box;
}
</style>
