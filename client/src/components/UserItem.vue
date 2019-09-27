<template>
    <b-list-group>
      <b-list-group-item >Username: {{ user.username }}
        <b-button pill variant="outline-info" size="sm" router-link :to="'/users/' + user._id ">View User</b-button>
        <b-button type="button" class="close" @click="$emit('delete-user', user._id)">&times;</b-button>
          <p>Email: {{ user.mail }}</p>
      </b-list-group-item>

      </b-list-group>
</template>

<script>

export default {
  name: 'user-item',
  props: ['user']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
