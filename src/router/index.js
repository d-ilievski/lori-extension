import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'MainMenu',
    component: () => import(/* webpackChunkName: "main-menu" */ '../components/Views/MainMenu.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/downloads',
    name: 'DownloadsList',
    component: () => import(/* webpackChunkName: "download-list" */ '../components/Views/DownloadsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/export',
    name: 'ExportManagement',
    component: () => import(/* webpackChunkName: "export-management" */ '../components/Views/ExportManagement.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editor',
    component: () => import(/* webpackChunkName: "photo-editor" */'../components/Views/PhotoEditor.vue'),
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
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stock',
    name: 'StockPhotos',
    component: () => import(/* webpackChunkName: "stock-photos" */ '../components/Views/StockPhotos.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Views/Login.vue'),
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (to.name === "Login" && currentUser) {
    next('/');
  } else {
    next();
  }
})

export default router
