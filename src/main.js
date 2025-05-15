/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

//global css for AppHeader
import './assets/styles/global.css';

//google map
import 'leaflet/dist/leaflet.css';

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
