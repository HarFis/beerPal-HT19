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

/* -------------
------Reviews---
------------- */

import Reviews from './views/reviews/Reviews.vue'
import CreateReview from './views/reviews/CreateReview.vue'
import EditReview from './views/reviews/EditReview.vue'

/* -------------
----Locations---
------------- */

import Locations from './views/locations/Locations.vue'
import CreateLocation from './views/locations/CreateLocation.vue'

/* --------------
------Users------
-------------- */
import RegisterUser from './views/users/RegisterUser.vue'
import Users from './views/users/Users.vue'
import UserDetails from './views/users/UserDetails.vue'

/* --------------
------Posts------
-------------- */

import CreatePost from './views/CreatePost.vue'

/* --------------
-------Home------
-------------- */

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
      path: '/users',
      name: 'users',
      component: Users
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
      path: '/reviews/edit/:reviewID',
      component: EditReview,
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
