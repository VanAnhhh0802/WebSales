import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// Create Vue application
const app = createApp(App);
// Create and use Pinia store
const pinia = createPinia();
app.use(pinia);
// Use router plugin
app.use(router);
// Mount the app to the DOM
app.mount('#app');
//# sourceMappingURL=main.js.map