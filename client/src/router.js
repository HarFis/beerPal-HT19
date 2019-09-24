import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
import Users from './views/Users.vue'
import LoginPage from './views/Login.vue'
import Reviews from './views/Reviews.vue'
import Beers from './views/Beers.vue'
import CreateBeer from './views/CreateBeer.vue'
import CreateReview from './views/CreateReview.vue'

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
      path: '/camels',
      name: 'camels',
      component: Camels
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/beers',
      name: 'beers',
      component: Beers
    },
    {
      path: '/create-beer',
      name: 'create-beer',
      component: CreateBeer
    },
    {
      path: '/create-review',
      name: 'create-review',
      component: CreateReview
    }
  ]
})
