<template>
    <b-list-group>
      <b-list-group-item :style="{ color }">Username: {{ user.username }}
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
