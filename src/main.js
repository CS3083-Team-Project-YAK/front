import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "/node_modules/@fortawesome/fontawesome-free/css/all.css"; // 引入 Font Awesome
import "/src/assets/styles.css"; // 引入全局样式

createApp(App)
  .use(router) // 使用路由
  .mount("#app"); // 挂载到 `#app`

