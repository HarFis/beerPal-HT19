<template>
  <div class="user">
    <b-container><b-card><b-row>
      <b-col><img alt="User" src="../../assets/drinkingStanding.png"></b-col>
      <b-col><h2 id="headline">User: {{ user.username }}</h2>
      <p>Email: {{ user.mail }}</p>
      <p>
        <b-button variant="danger" @click="deleteUser()">delete</b-button>
      </p></b-col>
      </b-row></b-card></b-container>
    <p>
      <b-container v-if="posts.length===0">
        <b-row id="warning">No posts yet.</b-row>
      </b-container>
      <b-container v-else>
        <b-list-group>
          <post-item v-for="post in posts" :key="post._id" :post="post"></post-item>
        </b-list-group>
      </b-container>
    </p>
  </div>
</template>

<script>
import { Api } from "@/Api";
import PostItem from "@/components/PostItem";

export default {
  name: "UserDetails",
  props: ["userID"],

  data() {
    return {
      user: "",
      posts: []
    };
  },
  created() {
    this.getPosts();
    this.getUser();
  },
  methods: {
    getUser() {
      console.log(this.userID);
      Api.get("users/" + this.userID)
        .then(response => {
          this.user = response.data;
          console.log(this.user);
        })
        .catch(error => {
          this.user = null;
          console.log(error);
        });
    },
    getPosts() {
      Api.get("users/" + this.userID + "/posts/")
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          this.posts = [];
          console.log(error);
        });
    },
    deleteUser(id) {
      Api.delete("users/" + this.userID)
        .then(response => {
          alert("user " + this.user.username + " deleted");
          this.$router.push({ path: "/users" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    PostItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.beer {
  color: darkslategray;
}

#headline {
  color: rgb(28, 52, 71);
  font-weight: 900;
}

#warning {
  color: crimson;
  font-weight: bold;
}
</style>
