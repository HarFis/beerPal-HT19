import Vue from 'vue'
import Router from 'vue-router'

/* -------------
---Breweries----
------------- */

import Breweries from './views/breweries/Breweries.vue'
import BreweryInfo from './views/breweries/BreweryInfo.vue'
import CreateBrewery from './views/breweries/CreateBrewery.vue'
import EditBrewery from './views/breweries/EditBrewery.vue'

/* -------------
------Beers-----
------------- */

import Beers from './views/beers/Beers.vue'
import CreateBeer from './views/beers/CreateBeer.vue'
import BeerDetails from './views/beers/BeerDetails.vue'

import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
import Users from './views/Users.vue'
import LoginPage from './views/Login.vue'
import Reviews from './views/Reviews.vue'
import Locations from './views/Locations.vue'
import RegisterUser from './views/RegisterUser.vue'
import CreatePost from './views/CreatePost.vue'
import CreateReview from './views/CreateReview.vue'
import CreateLocation from './views/CreateLocation.vue'
import UserDetails from './views/UserDetails.vue'

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
      path: '/locations',
      name: 'locations',
      component: Locations
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
      path: '/create-location',
      name: 'create-location',
      component: CreateLocation
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
    },
    {
      path: '/users/:userID',
      component: UserDetails,
      props: true
    },
    {
      path: '/create-brewery',
      name: 'create-brewery',
      component: CreateBrewery
    },
    {
      path: '/edit-brewery/:breweryId',
      name: 'edit-brewery',
      component: EditBrewery,
      props: true
    }
  ]
})
