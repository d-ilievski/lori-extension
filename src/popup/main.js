import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'

require("@/assets/plugins/icofont/icofont.min.css");

Vue.use(require('vue-moment'));
Vue.prototype.$utils = require('@/util/utils');
Vue.prototype.$eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
