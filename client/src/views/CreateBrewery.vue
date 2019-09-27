<template>
    
</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'CreateBrewery',
    date() {
        return{
            name: null,
            adress: null,
            link: null
        }
    },
    methods: {
        onSubmit() {
            var brewery = {
                name: this.name,
                adress: this.adress,
                link: this.link
            }
            Api.post('/breweries', breweries)
            .catch(error => {
                console.log(error)
            })
            this.name = null
            this.adress = null
            this.link = null
        }
    }
    
}
</script>