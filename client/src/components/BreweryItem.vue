<template>
  <div>
    <b-list-group-item>
      <b-container>
        <b-row>
          <b-col md="4"></b-col>
          <b-col md="4" class="text-left">
            <img alt="Brewery" src="../assets/brewery.png" />
            {{ brewery.name }}
          </b-col>
          <b-col>
            <b-button
              variant="outline-primary"
              size="sm"
              router-link
              :to="'/breweries/'  + brewery._id "
            >more details</b-button>&nbsp;
            <b-button
              variant="outline-danger"
              size="sm"
              @click="$emit('delete-brewery', brewery._id)"
            >delete</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  name: "brewery-item",
  props: ["brewery"]
};
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
