// vue-router的配置文件

import Vue from 'vue';
import VueRouter from 'vue-router';
// import Film from './views/Film.vue';
// import Cinema from './views/Cinema.vue';
// import Center from './views/Center.vue';
// import City from './views/City.vue';
// import Home from './views/Home.vue';
// import Detail from './views/Detail.vue';
// import Login from './views/Login.vue';
// import Card from './views/Card.vue';
// import Money from './views/Money.vue';
// import System from './views/System.vue';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  // 路由对照表
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: 'films',
          component: () => import('./views/Film.vue')
        },
        {
          path: 'cinemas',
          component: () => import('./views/Cinema.vue')
        },
        {
          path: 'center',
          component: () => import('./views/Center.vue')
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
      component: () => import('./views/City.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('./views/Detail.vue'),
      props: {
        name: '张三',
        age: 18
      }
    },
    {
      path: '/card',
      component: () => import('./views/Card.vue')
    },
    {
      path: '/money',
      component: () => import('./views/Money.vue')
    },
    {
      path: '/system',
      component: () => import('./views/System.vue')
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
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
