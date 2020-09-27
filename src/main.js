import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker.js"

import { CHECK_AUTH } from "./store/actions.type"
import ApiService from "./common/api.service"

Vue.config.productionTip = false;

ApiService.init();

// TODO: 왜 beforeEach를 사용하며 라우팅해야하는지 체크
router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
  console.log(to, from)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
