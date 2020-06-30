import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import "./assets/css/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
