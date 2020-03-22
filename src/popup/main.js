import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import store from '../store';

require("@/assets/plugins/icofont/icofont.min.css");

Vue.use(require('vue-moment'));
Vue.prototype.$utils = require('@/util/utils');
Vue.prototype.$eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
