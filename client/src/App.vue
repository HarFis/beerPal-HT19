<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link> |
      <router-link to ="/login">Login</router-link> |
      <router-link to="/beers"> Beers</router-link> |
      <router-link to="/breweries"> Breweries</router-link> |
      <router-link to="/reviews"> Reviews</router-link> |
      <router-link to="/locations"> Locations</router-link> |
      <router-link to="/create-beer"> CreateBeer</router-link> |
      <router-link to="/create-review"> Create a Review</router-link> |
      <router-link to="/create-location"> Create a Location</router-link> |
      <router-link to="/create-brewery"> Create a Brewery</router-link> |
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100%;
  position:relative;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html, body {
   margin:0;
   padding:0;
   height:100%;
}

#body {
   padding:10px;
   padding-bottom:40px;   /* Height of the footer */
}

#footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:40px;   /* Height of the footer */
   background:#cfcdcc; 
   text-align: center; 
}

.cp-text{ 
  font-family: monospace;
  color: rgba(0,0,0,.7); 
  text-shadow: 0 1px rgba(255, 255, 255, 0.1);
}

</style>
