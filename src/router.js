// vue-router的配置文件

import Vue from 'vue';
import VueRouter from 'vue-router';
import Film from './views/Film.vue';
import Cinema from './views/Cinema.vue';
import Center from './views/Center.vue';
import City from './views/City.vue';
import Home from './views/Home.vue';
import Detail from './views/Detail.vue';
import Login from './views/Login.vue';
import Card from './views/Card.vue';
import Money from './views/Money.vue';
import System from './views/System.vue';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'hash',
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
      component: Detail,
      props: {
        name: '张三',
        age: 18
      }
    },
    {
      path: '/card',
      component: Card
    },
    {
      path: '/money',
      component: Money
    },
    {
      path: '/system',
      component: System
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect: '/films'
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let nickname = sessionStorage.getItem('nickname');
  let list = ['/card', '/money', '/system'];
  if (list.indexOf(to.path) > -1 && !nickname) { // 拦截
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  NProgress.done();
})

export default router;
