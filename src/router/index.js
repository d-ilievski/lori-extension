import Vue from 'vue'
import VueRouter from 'vue-router'
import Popup from '../popup/App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DownloadsList',
    component: () => import(/* webpackChunkName: "download-list" */ '../components/Views/DownloadsList.vue')
  },
  {
    path: '/export',
    name: 'ExportManagement',
    component: () => import(/* webpackChunkName: "export-management" */ '../components/Views/ExportManagement.vue'),
    props: true
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "photo-tools" */ '../components/Views/PhotoTools.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
