import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import store from '../store';

import InputField from "@/components/InputField.vue"
import IconButton from "@/components/IconButton.vue"
import CustomButton from "@/components/CustomButton.vue"
import CustomCheckbox from "@/components/CustomCheckbox.vue"
import SwitcherButtons from "@/components/SwitcherButtons.vue"
import InputToggle from "@/components/InputToggle.vue"
import Loader from "@/components/Loader.vue"
import Modal from "@/components/Modal.vue"

import VueMasonry from 'vue-masonry-css'
import firebase from 'firebase';

Vue.use(require('vue-moment'));
Vue.use(VueMasonry);

Vue.prototype.$eventBus = new Vue();

Vue.component('input-field', InputField);
Vue.component('icon-button', IconButton);
Vue.component('custom-button', CustomButton);
Vue.component('custom-checkbox', CustomCheckbox);
Vue.component('switcher-buttons', SwitcherButtons);
Vue.component('input-toggle', InputToggle);
Vue.component('modal', Modal);
Vue.component('loader', Loader);

const VueUploadComponent = require('vue-upload-component');
Vue.component('file-upload', VueUploadComponent);

import { ColorPicker } from 'vue-color-gradient-picker'
Vue.component('color-picker', ColorPicker);
require('vue-color-gradient-picker/dist/index.css')


import vSelect from 'vue-select';
Vue.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';

let app;

const firebaseConfig = {
  // firebase config
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app)
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })

})
