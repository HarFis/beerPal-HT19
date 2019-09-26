<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/camels">Camels</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to ="/login">Login</router-link>
      <router-link to="/beers"> Beers</router-link>
      <router-link to="/breweries"> Breweries</router-link>
      <router-link to="/reviews"> Reviews</router-link>
      <router-link to="/locations"> Locations</router-link>
      <router-link to="/create-beer"> CreateBeer</router-link>
      <router-link to="/create-review"> Create a Review</router-link>
      <router-link to="/create-location"> Create a Location</router-link>

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
