<script setup lang="ts">
import KeycapArea from './KeycapArea.vue'
import {computed, inject, ref} from 'vue'

const store = inject('store')

interface Keycap {
  areas?: any[]
  type: string
}

interface Props {
  keycap: Keycap
}

const props = defineProps<Props>()

const generateStylesObject = (
  {
    type,
    outlineModifier
  }
) => computed(() => {
  const styleObject = {
    ...store.state.keycaps[props.keycap.type][type].style
  }
  if (outlineModifier && !store.state[outlineModifier]) {
    styleObject.border = 'none !important';
  }
  return styleObject
})

const innerStyle = generateStylesObject(
  {
    type: 'inner',
    outlineModifier: 'innerOutline'
  }
)

const outerStyle = generateStylesObject(
  {
    type: 'outer',
    outlineModifier: 'outerOutline'
  }
)

const select = () => {
  store.state.selected = props.keycap
}

const areas = computed(() => {
  const numOfAreas = store.state.keycaps[props.keycap.type].areas
  props.keycap.areas ||= []
  // props.keycap.areas.fill({}, 0, 10)

  // props.keycap.areas.push(...Array(numOfAreas).fill({}))

  props.keycap.areas.splice(
    Math.min(props.keycap.areas.length, numOfAreas),
    Math.max(0, props.keycap.areas.length - numOfAreas),
    ...Array(Math.max(0, numOfAreas - props.keycap.areas.length)).fill(null)
  )
  props.keycap.areas = props.keycap.areas.map(area => area || {})

  return props.keycap.areas
})

</script>

<template>
  <div class="keycap" :style="outerStyle" @click="select">
    <div class="keycap-inner" :style="innerStyle">
      <KeycapArea v-for="area in areas" :area="area" />
    </div>
  </div>
</template>

<style scoped>
.keycap {
  border: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1mm;

  cursor: pointer;
}

.keycap-inner {
  border: 1px solid #aaa;
  position: relative;
  border-radius: 3.75mm;
  display: grid;

  padding: 1.95mm;

  box-sizing: border-box;
}
</style>
