<template>

  <div class="users">
      <h1>Register a User</h1>
  <div>
      <form class="register-form" @submit.prevent="onSubmit">
          <p>
          <label for ="username">Username</label>
          <input id="username" v-model="username" placeholder="Username">
          </p>

          <p>
          <label for ="mail">Mail</label>
          <input id="mail" v-model="mail" placeholder="E-mail Adress">
          </p>

          <p>
             <label for ="password">password</label>
             <input type="password" id="password" v-model="password" placeholder="Password">
          </p>
          <p>
        <input type="submit" value ="Submit">
            </p>

          </form>
</div>
</div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'RegisterUser',
  data() {
    return {
      username: null,
      mail: null,
      password: null
    }
  },

  methods: {
    onSubmit() {
      var user = {
        username: this.username,
        mail: this.mail,
        password: this.password
      }
      Api.post('/users', user)
        .catch(error => {
          alert(error.response.data.message)
          console.log(error)
        })
      this.username = null
      this.mail = null
      this.password = null
    }
  }
}

</script>

<style scoped>
.color{
    color: #42b983;
}

.users{
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
