// vue-router的配置文件

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Film from './views/Film.vue';
import Cinema from './views/Cinema.vue';
import Center from './views/Center.vue';
import City from './views/City.vue';
import Home from './views/Home.vue';
import Detail from './views/Detail.vue';
import Login from './views/Login.vue';
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
      component: {
        render (h) {
          return h('div', '卖座卡页面');
        }
      }
    },
    {
      path: '/money',
      component: {
        render (h) {
          return h('div', '余额页面');
        }
      }
    },
    {
      path: '/system',
      component: {
        render (h) {
          return h('div', '设置页面');
        }
      }
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
  if (to.path === '/card' || to.path === '/money' || to.path === '/system') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  NProgress.done();
})

export default router;
