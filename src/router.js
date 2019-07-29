import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      children:[
        {
          path:'children1',
          component: () => import(/* webpackChunkName: "about" */ './components/children1.vue'),
        },
        {
          path:'children2',
          component: () => import(/* webpackChunkName: "about" */ './components/children2.vue'),
        }
      ]
    },
    {
      path: '/todolist',
      name: 'todolist',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/todolist.vue')
    },
    {
      path: '/todolist2',
      name: 'todolist2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/todolist2.vue')
    }
  ]
})
