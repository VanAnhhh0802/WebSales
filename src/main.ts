import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Create Vue application
const app = createApp(App);

// Use router plugin
app.use(router);

// Mount the app to the DOM
app.mount('#app');
