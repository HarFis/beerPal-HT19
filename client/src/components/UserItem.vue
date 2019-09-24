<template>
    <b-list-group>
      <b-list-group-item :style="{ color }">Username: {{ user.username }}
        <b-button type="button" class="close" @click="$emit('delete-beer', beer._id)">&times;</b-button>
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
