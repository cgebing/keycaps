import { createApp } from 'vue'
import App from './App.vue'
import {createStore} from './utils/store'

createApp(App).provide('store', createStore()).mount('#app')
