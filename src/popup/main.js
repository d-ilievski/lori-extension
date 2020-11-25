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
  apiKey: "AIzaSyC9S8EAf0a4y7UNKFlceQLq5kzrQE4z_bQ",
  authDomain: "lori-969d3.firebaseapp.com",
  databaseURL: "https://lori-969d3.firebaseio.com",
  projectId: "lori-969d3",
  storageBucket: "lori-969d3.appspot.com",
  messagingSenderId: "248298020393",
  appId: "1:248298020393:web:a00fe4671e51ab20dc4638",
  measurementId: "G-GPSDKEZVLN"
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
