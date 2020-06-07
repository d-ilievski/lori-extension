import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainMenu',
    component: () => import(/* webpackChunkName: "main-menu" */ '../components/Views/MainMenu.vue'),
    props: true
  },
  {
    path: '/downloads',
    name: 'DownloadsList',
    component: () => import(/* webpackChunkName: "download-list" */ '../components/Views/DownloadsList.vue')
  },
  {
    path: '/export',
    name: 'ExportManagement',
    component: () => import(/* webpackChunkName: "export-management" */ '../components/Views/ExportManagement.vue'),
  },
  {
    path: '/editor',
    component: () => import('../components/Views/PhotoEditor.vue'),
    children: [
      {
        path: 'cropper',
        name: 'Cropper',
        component: () => import(/* webpackChunkName: "cropper" */ '../components/Views/Cropper.vue'),
      },
      {
        path: 'designer',
        name: 'Designer',
        params: true,
        component: () => import(/* webpackChunkName: "designer" */ '../components/Views/Designer.vue'),
      }
    ]
  },
  {
    path: '/stock',
    name: 'StockPhotos',
    component: () => import(/* webpackChunkName: "stock-photos" */ '../components/Views/StockPhotos.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
