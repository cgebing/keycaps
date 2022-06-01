<script setup lang="ts">
import {fetchJson} from '../utils/fetch'
import {computed, inject, onMounted, reactive, Ref, ref, watch} from 'vue'
import KeycapRow from './KeycapRow.vue'
import {fetchFonts, Font, loadFont} from '../utils/fonts'

const store = inject('store')

// let layout = reactive(
//   {
//     rows: [],
//     fontFamily: '',
//     fontVariant: ''
//   }
// )
//
// let fonts: Ref<Font[]> = ref([])
//
// let selectedFont = ref({})
//
onMounted(async () => {
  await store.fetchKeyboard()
  await store.fetchFonts()
})
//
// const json = computed(() => {
//   return JSON.stringify(layout, null, 4)
// })
//
// const changeFont = () => {
//   layout.fontFamily = selectedFont.value.family
//   layout.fontVariant = selectedFont.value.variants[0]
// }
//
//
// watch(
//   currentFont,
//   currentFont => {
//     loadFont(layout.fontFamily, layout.fontVariant, currentFont)
//   }
// )
</script>

<template>
  <div class="wrapper">
    <div class="frame">
      <KeycapRow v-for="row in store.state.keyboard.rows" :row="row" />
    </div>
    <div class="sidebar">
      <div>
        <div>Global Settings</div>
        <label>
          Font-Family:
          <select v-model="store.state.keyboard.fontFamily">
            <option v-for="font in store.state.fonts" :value="font.family">{{ font.family }}</option>
          </select>
        </label>
        <label v-if="store.state.fonts[store.state.keyboard.fontFamily]">
          Variants:
          <select v-model="store.state.keyboard.fontVariant">
            <option v-for="variant in store.state.fonts[store.state.keyboard.fontFamily].variants">{{ variant }}</option>
          </select>
        </label>
      </div>
      <div>
        <label>Outer outline: <input type="checkbox" v-model="store.state.outerOutline"></label>
        <label>Inner outline: <input type="checkbox" v-model="store.state.innerOutline"></label>
      </div>
      <div>
        <textarea class="json">{{ store.json() }}</textarea>
      </div>
      <div v-if="store.state.selected">
        <details v-for="(area, index) in store.state.selected.areas">
          <summary>{{ index + 1 }}. Area</summary>
          <div>
            <div><label>Text: <input v-model="area.text" /></label></div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  padding: 15px;
}
.frame {
  max-height: 190mm;
  max-width: 265mm;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
  flex-direction: column;
  font-family: v-bind('store.currentFont()');
}
.sidebar {
  flex-grow: 1;
}
.json {
  display: block;
  height: 500px;
  width: 100%;
}

@media print {
  .frame {
    border: 0;
  }
  .wrapper {
    padding: 0;
  }
  .sidebar {
    display: none;
  }
}
</style>
