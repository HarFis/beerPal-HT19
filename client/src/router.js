import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
<<<<<<< HEAD
import Users from './views/Users.vue'
import LoginPage from './views/Login.vue'
import RegisterPage from '.views/Register.vue'
=======
import Reviews from './views/Reviews.vue'
import Beers from './views/Beers.vue'
>>>>>>> 8e97af5cec1c3dc2391cb60d6f72d14795d8becf

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
<<<<<<< HEAD
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
      path: '/register',
      name: 'register',
      component: RegisterPage
=======
      path: '/reviews',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/beers',
      name: 'beers',
      component: Beers
>>>>>>> 8e97af5cec1c3dc2391cb60d6f72d14795d8becf
    }
  ]
})
