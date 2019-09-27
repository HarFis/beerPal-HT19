<template>
  <div class="user">
    <h1 id="headline">{{ user.username }}</h1>
    <b-container v-if="!posts"> <p>No posts yet.</p></b-container>
    <b-container>
      <b-list-group>
       <post-item v-for="post in posts" :key="post._id" :post="post"></post-item>
      </b-list-group>
    </b-container>
    
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'
import PostItem from '@/components/PostItem'

export default {
    name: 'UserDetails',
    props: ['userID'],

    data() {
      return {
        user: "",
        users: []
      }
    }, 
    mounted() {
        this.getReviews()
        this.getBeer() 
    },
    methods: {
        getUsers(){
            Api.get('users/'+this.userID)
            .then( response => {
                this.user = response.data
            }).catch(error =>{
                this.user = null
                console.log(error)
            })
        },
        getPosts(){
            Api.get('users/' + this.userID + '/posts/')
            .then( response => {
                this.posts = response.data.posts
            }).catch(error =>{
                this.posts = []
                console.log(error)
            })
        }
    }, 
    components: {
        PostItem,
        UserItem
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.beer{
  color: darkslategray;
}

#headline {
  color:rgb(28, 52, 71);
  font-weight: 900;
}

#warning {
  color: crimson ;
  font-weight: bold;
}

</style>
