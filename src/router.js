// vue-router的配置文件

import Vue from 'vue';
import VueRouter from 'vue-router';
import Film from './views/Film.vue';
import Cinema from './views/Cinema.vue';
import Center from './views/Center.vue';
import City from './views/City.vue';
import Home from './views/Home.vue';
import Detail from './views/Detail.vue';

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  // 路由对照表
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'films',
          component: Film
        },
        {
          path: 'cinemas',
          component: Cinema
        },
        {
          path: 'center',
          component: Center
        },
        {
          path: '',
          redirect: 'films'
        }
      ]
    },
    {
      name: 'hhh',
      path: '/city',
      component: City
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '*',
      redirect: '/films'
    }
  ]
});

export default router;
