<template>
  <div id="app">
    <div id="nav" class="navbar sticky-top navbar-light bg-light">
      <div class="navbar-brand"><router-link to="/"><img src="./assets/logo.png" width="80" height="80" alt="Beer-pal Logo" ></router-link></div>
      <router-link to="/users">Users</router-link> | 
      <router-link to="/beers"> Beers</router-link> | 
      <router-link to="/breweries"> Breweries</router-link> | 
      <router-link to="/reviews"> Reviews</router-link> | 
      <router-link to="/locations"> Locations</router-link> | 
      <router-link to="/create-beer"> Create a Beer</router-link> | 
      <router-link to="/create-location"> Create a Location</router-link> | 
      <router-link to="/create-brewery"> Create a Brewery</router-link>
    </div>
    
    <div id="body">
      <router-view/>
    </div>
    <div id="footer">
     <p class="cp-text">Copyright © 2019 Fischer-Vaara-Strand Enterprise. All rights reserved</p>
    </div>
  </div>
</template>

<style>
 @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
 @import url('https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap');
 

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100%;
  position:relative;
}
#nav {
  padding: 20px;
  border: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #e97b15;
}

html, body {
   margin:0;
   padding:0;
   height:100%;
}

#body {
   padding:10px;
   padding-bottom: 40px;   /* Height of the footer */
}

#footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:20px;   /* Height of the footer */
   background:#cfcdcc; 
   text-align: center; 
}

.beer-titel {
  font-weight: bolder;
}

.font-review {
    font-family: 'Patrick Hand', cursive;
    font-size:large;
    font-weight: bold;
}

.img-score {
  height: 25px;
}

.cp-text{
  font-family: monospace;
  font-size: medium;
  text-shadow: 0 1px rgba(255, 255, 255, 0);
}
</style>
