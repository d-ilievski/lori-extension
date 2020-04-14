import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import store from '../store';

import InputField from "@/components/InputField.vue"
import IconButton from "@/components/IconButton.vue"
import CustomButton from "@/components/CustomButton.vue"
import SwitcherButtons from "@/components/SwitcherButtons.vue"
import InputToggle from "@/components/InputToggle.vue"
import Modal from "@/components/Modal.vue"

Vue.use(require('vue-moment'));
Vue.prototype.$eventBus = new Vue();

Vue.component('input-field', InputField);
Vue.component('icon-button', IconButton);
Vue.component('custom-button', CustomButton);
Vue.component('switcher-buttons', SwitcherButtons);
Vue.component('input-toggle', InputToggle);
Vue.component('modal', Modal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
