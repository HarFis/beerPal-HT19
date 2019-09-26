import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
import Users from './views/Users.vue'
import LoginPage from './views/Login.vue'
import Reviews from './views/Reviews.vue'
import Beers from './views/Beers.vue'
import RegisterUser from './views/RegisterUser.vue'
import CreateBeer from './views/CreateBeer.vue'
import CreatePost from './views/CreatePost.vue'
import CreateReview from './views/CreateReview.vue'
import BeerDetails from './views/BeerDetails.vue'
import Breweries from './views/Breweries.vue'
import BreweryInfo from './views/BreweryInfo.vue'

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
      path: '/registerUser',
      name: 'registerUser',
      component: RegisterUser
    },
    {
      path: '/create-beer',
      name: 'create-beer',
      component: CreateBeer
    },
    {
      path: '/CreatePost',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/create-review',
      name: 'create-review',
      component: CreateReview
    },
    {
      path: '/beers/:beerID',
      component: BeerDetails,
      props: true
    },
    {
      path: '/breweries',
      name: 'breweries',
      component: Breweries
    },
    {
      path: '/breweries/:breweryId',
      component: BreweryInfo,
      props: true
    }
  ]
})
