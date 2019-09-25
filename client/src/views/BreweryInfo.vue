<template>
  <div>
    <p> {{brewery.name}} </p>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
    props: ['breweryId'],

    data() {
        return {
            brewery: null,
        }
    },

    mounted() {
        this.getBrewery();
    },

    methods: {
        getBrewery() {
            Api.get('breweries/' + this.breweryId)
                 .then(response => this.brewery = response.data)
        },
    },
}
</script>

<style scoped>

</style>
