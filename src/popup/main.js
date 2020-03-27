import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import store from '../store';

import InputField from "@/components/InputField.vue"
import IconButton from "@/components/IconButton.vue"
import SwitcherButtons from "@/components/SwitcherButtons.vue"

Vue.use(require('vue-moment'));
Vue.prototype.$eventBus = new Vue();

Vue.component('input-field', InputField);
Vue.component('icon-button', IconButton);
Vue.component('switcher-buttons', SwitcherButtons);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
