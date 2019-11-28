import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/axios',
    component: () => import('./pages/axios'),
  },
  {
    path: '/request/:name',
    component: () => import('./pages/request'),
    props: true,
  },
  {
    path: '/batch/:name',
    component: () => import('./pages/batch'),
    props: true,
  },
];

export default new Router({
  mode: 'history',
  routes,
});
