import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importa el enrutador

createApp(App)
  .use(router)  // Asegúrate de usar el enrutador
 .mount('#app');
